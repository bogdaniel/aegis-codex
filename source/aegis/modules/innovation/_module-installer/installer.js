const fs = require('fs-extra');
const path = require('node:path');
const chalk = require('chalk');

/**
 * Aegis Innovation Module Installer
 * Standard module installer function that executes after IDE installations
 *
 * @param {Object} options - Installation options
 * @param {string} options.projectRoot - The root directory of the target project
 * @param {Object} options.config - Module configuration from install-config.yaml
 * @param {Array<string>} options.installedIDEs - Array of IDE codes that were installed
 * @param {Object} options.logger - Logger instance for output
 * @returns {Promise<boolean>} - Success status
 */
async function install(options) {
  const { projectRoot, config, installedIDEs, logger } = options;

  try {
    logger.log(chalk.blue('🎨 Installing Aegis Innovation Module...'));

    // Create output directory if configured
    if (config['output_folder']) {
      // Strip {project-root}/ prefix if present
      const outputConfig = config['output_folder'].replace('{project-root}/', '');
      const outputPath = path.join(projectRoot, outputConfig);
      if (!(await fs.pathExists(outputPath))) {
        logger.log(chalk.yellow(`Creating Aegis Innovation output directory: ${outputConfig}`));
        await fs.ensureDir(outputPath);

        // Add any default Aegis Innovation templates or assets here
        const templatesSource = path.join(__dirname, 'assets');
        const templateFiles = await fs.readdir(templatesSource).catch(() => []);

        for (const file of templateFiles) {
          const source = path.join(templatesSource, file);
          const dest = path.join(outputPath, file);

          if (!(await fs.pathExists(dest))) {
            await fs.copy(source, dest);
            logger.log(chalk.green(`✓ Added ${file}`));
          }
        }
      }
    }

    // Handle IDE-specific configurations if needed
    if (installedIDEs && installedIDEs.length > 0) {
      logger.log(chalk.cyan(`Configuring Aegis Innovation for IDEs: ${installedIDEs.join(', ')}`));

      // Add any IDE-specific Aegis Innovation configurations here
      for (const ide of installedIDEs) {
        await configureForIDE(ide, projectRoot, config, logger);
      }
    }

    logger.log(chalk.green('✓ Aegis Innovation Module installation complete'));
    return true;
  } catch (error) {
    logger.error(chalk.red(`Error installing Aegis Innovation module: ${error.message}`));
    return false;
  }
}

/**
 * Configure Aegis Innovation module for specific IDE
 * @private
 */
async function configureForIDE(ide) {
  // Add IDE-specific configurations here
  switch (ide) {
    case 'claude-code': {
      // Claude Code specific Aegis Innovation configurations
      break;
    }
    case 'cursor': {
      // Cursor specific Aegis Innovation configurations
      break;
    }
    case 'windsurf': {
      // Windsurf specific Aegis Innovation configurations
      break;
    }
    // Add more IDEs as needed
    default: {
      // No specific configuration needed
      break;
    }
  }
}

module.exports = { install };
