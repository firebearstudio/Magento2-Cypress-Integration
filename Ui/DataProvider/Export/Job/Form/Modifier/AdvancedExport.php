<?php
/**
 * @copyright: Copyright © 2019 Firebear Studio. All rights reserved.
 * @author   : Firebear Studio <fbeardev@gmail.com>
 */

namespace Firebear\ImportExportCypress\Ui\DataProvider\Export\Job\Form\Modifier;

/**
 * Data provider for advanced inventory form
 */
class AdvancedExport extends \Firebear\ImportExport\Ui\DataProvider\Export\Job\Form\Modifier\AdvancedExport
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
