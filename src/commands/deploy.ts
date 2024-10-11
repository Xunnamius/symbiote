import { type ChildConfiguration } from '@black-flag/core';
import askPassword from 'askpassword';
import uniqueFilename from 'unique-filename';

import {
  LogTag,
  logStartTime,
  standardSuccessMessage
} from 'multiverse#cli-utils logging.ts';

import { softAssert } from 'multiverse#cli-utils error.ts';
import { scriptBasename } from 'multiverse#cli-utils util.ts';
import { ProjectAttribute } from 'multiverse#project-utils';
import { type AsStrictExecutionContext } from 'multiverse#bfe';
import { run } from 'multiverse#run';

import { ErrorMessage } from 'universe error.ts';

import {
  type GlobalCliArguments,
  type GlobalExecutionContext
} from 'universe configure.ts';

import {
  checkIsNotNil,
  withGlobalBuilder,
  withGlobalUsage,
  runGlobalPreChecks
} from 'universe util.ts';

export enum DeployTarget {
  Vercel = 'vercel',
  Ssh = 'ssh'
}

export const deployTargets = Object.values(DeployTarget);

export type CustomCliArguments = GlobalCliArguments & {
  target: DeployTarget;
  bumpVersion?: boolean;
} & (
    | {
        target: DeployTarget.Vercel;
        production?: boolean;
        preview: boolean;
        previewUrl?: string;
      }
    | {
        target: DeployTarget.Ssh;
        host: string;
        toPath: string;
      }
  );

export default function command({
  log,
  debug_,
  state,
  projectMetadata: projectMetadata_
}: AsStrictExecutionContext<GlobalExecutionContext>) {
  const [builder, withGlobalHandler] = withGlobalBuilder<CustomCliArguments>({
    target: {
      string: true,
      description: 'Select deployment target and strategy',
      demandThisOption: true,
      choices: deployTargets,
      subOptionOf: {
        target: {
          when: () => true,
          update(oldOptionConfig, { target }) {
            return {
              ...oldOptionConfig,
              choices: [target]
            };
          }
        }
      }
    },
    production: {
      alias: ['prod'],
      boolean: true,
      description: 'Deploy to the remote production environment',
      requires: { target: DeployTarget.Vercel },
      implies: { preview: false },
      looseImplications: true,
      subOptionOf: {
        target: {
          when: (target) => target !== DeployTarget.Vercel,
          update(oldOptionConfig) {
            return {
              ...oldOptionConfig,
              hidden: true
            };
          }
        }
      }
    },
    preview: {
      boolean: true,
      description: 'Deploy to the remote preview environment',
      requires: { target: DeployTarget.Vercel },
      default: true,
      check(preview, { target, production }) {
        return (
          target !== DeployTarget.Vercel ||
          preview ||
          production ||
          ErrorMessage.MustChooseDeployEnvironment()
        );
      },
      subOptionOf: {
        target: {
          when: (target) => target !== DeployTarget.Vercel,
          update(oldOptionConfig) {
            return {
              ...oldOptionConfig,
              hidden: true
            };
          }
        }
      }
    },
    'preview-url': {
      string: true,
      description: 'The vercel preview deployment custom URL (alias) ',
      requires: { target: DeployTarget.Vercel },
      check: checkIsNotNil,
      subOptionOf: {
        target: {
          when: (target) => target !== DeployTarget.Vercel,
          update(oldOptionConfig) {
            return {
              ...oldOptionConfig,
              hidden: true
            };
          }
        }
      }
    },
    host: {
      string: true,
      description: 'The ssh deploy host',
      requires: { target: DeployTarget.Ssh },
      check: checkIsNotNil,
      subOptionOf: {
        target: [
          {
            when: (target) => target === DeployTarget.Ssh,
            update(oldOptionConfig) {
              return {
                ...oldOptionConfig,
                demandThisOption: true
              };
            }
          },
          {
            when: (target) => target !== DeployTarget.Ssh,
            update(oldOptionConfig) {
              return {
                ...oldOptionConfig,
                hidden: true
              };
            }
          }
        ]
      }
    },
    'to-path': {
      string: true,
      description: 'The ssh deploy destination path',
      requires: { target: DeployTarget.Ssh },
      subOptionOf: {
        target: [
          {
            when: (target) => target === DeployTarget.Ssh,
            update(oldOptionConfig) {
              return {
                ...oldOptionConfig,
                demandThisOption: true
              };
            }
          },
          {
            when: (target) => target !== DeployTarget.Ssh,
            update(oldOptionConfig) {
              return {
                ...oldOptionConfig,
                hidden: true
              };
            }
          }
        ]
      }
    },
    '--bump-version': {
      boolean: true,
      description: 'Bump the patch version in package.json after the deployment completes'
    }
  });

  return {
    builder,
    description: 'Deploy distributes to the appropriate remote',
    usage: withGlobalUsage(
      `$1.

When using --target=ssh, it is assumed the key pair necessary to authenticate with --host is available in the environment. This command will fail if authenticating to --host requires a password or other user input.`
    ),
    handler: withGlobalHandler(async function (argv) {
      const { $0: scriptFullName, target, bumpVersion } = argv;
      const genericLogger = log.extend(scriptBasename(scriptFullName));
      const debug = debug_.extend('handler');

      debug('entered handler');

      const { projectMetadata } = await runGlobalPreChecks({ debug_, projectMetadata_ });
      const { startTime } = state;

      logStartTime({ log, startTime });
      genericLogger([LogTag.IF_NOT_QUIETED], 'Deploying project...');

      const { attributes } = projectMetadata.project;
      const deployMessage = (deployTarget: string) =>
        `Deploying distributables to ${deployTarget} target...`;

      switch (target) {
        case DeployTarget.Vercel: {
          softAssert(
            attributes[ProjectAttribute.Vercel],
            ErrorMessage.WrongProjectAttributes([ProjectAttribute.Vercel], attributes)
          );

          const { production, preview, previewUrl } = argv;

          if (production) {
            genericLogger([LogTag.IF_NOT_QUIETED], deployMessage('vercel (production)'));
            await run('vercel', ['deploy', '--prod']);
          }

          if (preview) {
            genericLogger([LogTag.IF_NOT_QUIETED], deployMessage('vercel (preview)'));

            const generatedUrl = (await run('vercel', ['deploy'])).stdout;

            if (previewUrl) {
              await run('vercel', ['alias', 'set', generatedUrl, previewUrl]);
            }
          }

          break;
        }

        case DeployTarget.Ssh: {
          genericLogger([LogTag.IF_NOT_QUIETED], deployMessage('ssh'));

          const { host, toPath } = argv;
          const remoteTmpdirPath = uniqueFilename('/tmp', 'x-deploy');

          await run('rsync', [
            '-chavzP',
            '--stats',
            'dist',
            `${host}:${remoteTmpdirPath}`
          ]);

          process.stdout.write(`Enter sudo password for remote ${host}: `);
          const sudoPassword = await askPassword(process.stdin);

          const uploadScript = [
            `echo ${sudoPassword.toString('utf8')} | sudo -S rm -rf ${toPath}`,
            `echo ${sudoPassword.toString('utf8')} | sudo -S mv ${remoteTmpdirPath}/dist ${toPath}`,
            `echo ${sudoPassword.toString('utf8')} | sudo -S chown -R www-data:www-data ${toPath}`
          ];

          await run('ssh', [host, uploadScript.join(' && ')]);

          break;
        }
      }

      if (bumpVersion) {
        const oldVersion: string = JSON.parse(
          (await run('npm', ['pkg', 'get', 'version'])).stdout
        );

        await run('npm', ['--no-git-tag-version', 'version', 'patch']);

        const updatedVersion: string = JSON.parse(
          (await run('npm', ['pkg', 'get', 'version'])).stdout
        );

        genericLogger(
          [LogTag.IF_NOT_QUIETED],
          `Bumped package minor version from ${oldVersion} to ${updatedVersion}`
        );
      }

      genericLogger([LogTag.IF_NOT_QUIETED], standardSuccessMessage);
    })
  } satisfies ChildConfiguration<CustomCliArguments, GlobalExecutionContext>;
}
