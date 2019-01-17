/**
 * @copyright: Copyright © 2019 Firebear Studio. All rights reserved.
 * @author   : Firebear Studio <fbeardev@gmail.com>
 */


define([
    'underscore',
], function (_) {
    'use strict';

    return function (button) {

        button._setButtonClasses = function () {
            var additional = this.buttonClasses;

            if (_.isString(additional)) {
                this.buttonClasses = {};

                if (additional.trim().length) {
                    additional = additional.trim().split(' ');

                    additional.forEach(function (name) {
                        if (name.length) {
                            this.buttonClasses[name] = true;
                        }
                    }, this);
                }
            }

            _.extend(this.buttonClasses, {
                'action-secondary': !this.displayAsLink,
                'action-advanced': this.displayAsLink
            });

            return this;
        }

        return button;
    };
});
