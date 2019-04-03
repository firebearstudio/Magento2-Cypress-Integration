<?php
/**
 * @copyright: Copyright © 2019 Firebear Studio. All rights reserved.
 * @author   : Firebear Studio <fbeardev@gmail.com>
 */

namespace Firebear\ImportExportCypress\Ui\DataProvider\Import\Job\Form\Modifier;

/**
 * Data provider for advanced inventory form
 */
class AdvancedImport extends \Firebear\ImportExport\Ui\DataProvider\Import\Job\Form\Modifier\AdvancedImport
{

    /**
     * @return array
     */
    protected function addFieldSource()
    {
        $childrenArray = parent::addFieldSource();

        foreach ($childrenArray as $children => $config) {
            $config['arguments']['data']['config']['additionalClasses'] = $children;
            $childrenArray[$children] = $config;
        }

        return $childrenArray;
    }
}
