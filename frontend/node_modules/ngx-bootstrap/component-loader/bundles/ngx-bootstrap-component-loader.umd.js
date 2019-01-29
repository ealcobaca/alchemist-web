(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('ngx-bootstrap/utils'), require('ngx-bootstrap/positioning')) :
    typeof define === 'function' && define.amd ? define('ngx-bootstrap/component-loader', ['exports', '@angular/core', 'ngx-bootstrap/utils', 'ngx-bootstrap/positioning'], factory) :
    (factory((global['ngx-bootstrap'] = global['ngx-bootstrap'] || {}, global['ngx-bootstrap']['component-loader'] = {}),global.ng.core,global.utils,global.positioning));
}(this, (function (exports,core,utils,positioning) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    /**
     * @template T
     */
    var /**
     * @template T
     */ BsComponentRef = (function () {
        function BsComponentRef() {
        }
        return BsComponentRef;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    /**
     * @copyright Valor Software
     * @copyright Angular ng-bootstrap team
     */
    var ContentRef = (function () {
        function ContentRef(/* tslint:disable-next-line: no-any */ 
        /* tslint:disable-next-line: no-any */
        nodes, viewRef, /* tslint:disable-next-line: no-any */ 
        /* tslint:disable-next-line: no-any */
        componentRef) {
            this.nodes = nodes;
            this.viewRef = viewRef;
            this.componentRef = componentRef;
        }
        return ContentRef;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    /**
     * @template T
     */
    var /**
     * @template T
     */ ComponentLoader = (function () {
        function ComponentLoader(_viewContainerRef, _renderer, _elementRef, _injector, _componentFactoryResolver, _ngZone, _applicationRef, _posService) {
            this._viewContainerRef = _viewContainerRef;
            this._renderer = _renderer;
            this._elementRef = _elementRef;
            this._injector = _injector;
            this._componentFactoryResolver = _componentFactoryResolver;
            this._ngZone = _ngZone;
            this._applicationRef = _applicationRef;
            this._posService = _posService;
            this.onBeforeShow = new core.EventEmitter();
            /* tslint:disable-next-line: no-any*/
            this.onShown = new core.EventEmitter();
            /* tslint:disable-next-line: no-any*/
            this.onBeforeHide = new core.EventEmitter();
            this.onHidden = new core.EventEmitter();
            this._providers = [];
            this._isHiding = false;
            this._listenOpts = {};
            this._globalListener = Function.prototype;
        }
        Object.defineProperty(ComponentLoader.prototype, "isShown", {
            get: /**
             * @return {?}
             */ function () {
                if (this._isHiding) {
                    return false;
                }
                return !!this._componentRef;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @param {?} compType
         * @return {?}
         */
        ComponentLoader.prototype.attach = /**
         * @param {?} compType
         * @return {?}
         */
            function (compType) {
                this._componentFactory = this._componentFactoryResolver
                    .resolveComponentFactory(compType);
                return this;
            };
        // todo: add behaviour: to target element, `body`, custom element
        /**
         * @param {?=} container
         * @return {?}
         */
        ComponentLoader.prototype.to = /**
         * @param {?=} container
         * @return {?}
         */
            function (container) {
                this.container = container || this.container;
                return this;
            };
        /**
         * @param {?=} opts
         * @return {?}
         */
        ComponentLoader.prototype.position = /**
         * @param {?=} opts
         * @return {?}
         */
            function (opts) {
                this.attachment = opts.attachment || this.attachment;
                this._elementRef = ((opts.target)) || this._elementRef;
                return this;
            };
        /**
         * @param {?} provider
         * @return {?}
         */
        ComponentLoader.prototype.provide = /**
         * @param {?} provider
         * @return {?}
         */
            function (provider) {
                this._providers.push(provider);
                return this;
            };
        // todo: appendChild to element or document.querySelector(this.container)
        /**
         * @param {?=} opts
         * @return {?}
         */
        ComponentLoader.prototype.show = /**
         * @param {?=} opts
         * @return {?}
         */
            function (opts) {
                if (opts === void 0) {
                    opts = {};
                }
                this._subscribePositioning();
                this._innerComponent = null;
                if (!this._componentRef) {
                    this.onBeforeShow.emit();
                    this._contentRef = this._getContentRef(opts.content, opts.context, opts.initialState);
                    var /** @type {?} */ injector = core.Injector.create({
                        providers: this._providers,
                        parent: this._injector
                    });
                    this._componentRef = this._componentFactory.create(injector, this._contentRef.nodes);
                    this._applicationRef.attachView(this._componentRef.hostView);
                    // this._componentRef = this._viewContainerRef
                    //   .createComponent(this._componentFactory, 0, injector, this._contentRef.nodes);
                    this.instance = this._componentRef.instance;
                    Object.assign(this._componentRef.instance, opts);
                    if (this.container instanceof core.ElementRef) {
                        this.container.nativeElement.appendChild(this._componentRef.location.nativeElement);
                    }
                    if (this.container === 'body' && typeof document !== 'undefined') {
                        document
                            .querySelector(/** @type {?} */ (this.container))
                            .appendChild(this._componentRef.location.nativeElement);
                    }
                    if (!this.container &&
                        this._elementRef &&
                        this._elementRef.nativeElement.parentElement) {
                        this._elementRef.nativeElement.parentElement.appendChild(this._componentRef.location.nativeElement);
                    }
                    // we need to manually invoke change detection since events registered
                    // via
                    // Renderer::listen() are not picked up by change detection with the
                    // OnPush strategy
                    if (this._contentRef.componentRef) {
                        this._innerComponent = this._contentRef.componentRef.instance;
                        this._contentRef.componentRef.changeDetectorRef.markForCheck();
                        this._contentRef.componentRef.changeDetectorRef.detectChanges();
                    }
                    this._componentRef.changeDetectorRef.markForCheck();
                    this._componentRef.changeDetectorRef.detectChanges();
                    this.onShown.emit(this._componentRef.instance);
                }
                this._registerOutsideClick();
                return this._componentRef;
            };
        /**
         * @return {?}
         */
        ComponentLoader.prototype.hide = /**
         * @return {?}
         */
            function () {
                if (!this._componentRef) {
                    return this;
                }
                this.onBeforeHide.emit(this._componentRef.instance);
                var /** @type {?} */ componentEl = this._componentRef.location.nativeElement;
                componentEl.parentNode.removeChild(componentEl);
                if (this._contentRef.componentRef) {
                    this._contentRef.componentRef.destroy();
                }
                this._componentRef.destroy();
                if (this._viewContainerRef && this._contentRef.viewRef) {
                    this._viewContainerRef.remove(this._viewContainerRef.indexOf(this._contentRef.viewRef));
                }
                if (this._contentRef.viewRef) {
                    this._contentRef.viewRef.destroy();
                }
                this._contentRef = null;
                this._componentRef = null;
                this._removeGlobalListener();
                this.onHidden.emit();
                return this;
            };
        /**
         * @return {?}
         */
        ComponentLoader.prototype.toggle = /**
         * @return {?}
         */
            function () {
                if (this.isShown) {
                    this.hide();
                    return;
                }
                this.show();
            };
        /**
         * @return {?}
         */
        ComponentLoader.prototype.dispose = /**
         * @return {?}
         */
            function () {
                if (this.isShown) {
                    this.hide();
                }
                this._unsubscribePositioning();
                if (this._unregisterListenersFn) {
                    this._unregisterListenersFn();
                }
            };
        /**
         * @param {?} listenOpts
         * @return {?}
         */
        ComponentLoader.prototype.listen = /**
         * @param {?} listenOpts
         * @return {?}
         */
            function (listenOpts) {
                var _this = this;
                this.triggers = listenOpts.triggers || this.triggers;
                this._listenOpts.outsideClick = listenOpts.outsideClick;
                this._listenOpts.outsideEsc = listenOpts.outsideEsc;
                listenOpts.target = listenOpts.target || this._elementRef.nativeElement;
                var /** @type {?} */ hide = (this._listenOpts.hide = function () {
                    return listenOpts.hide ? listenOpts.hide() : void _this.hide();
                });
                var /** @type {?} */ show = (this._listenOpts.show = function (registerHide) {
                    listenOpts.show ? listenOpts.show(registerHide) : _this.show(registerHide);
                    registerHide();
                });
                var /** @type {?} */ toggle = function (registerHide) {
                    _this.isShown ? hide() : show(registerHide);
                };
                this._unregisterListenersFn = utils.listenToTriggersV2(this._renderer, {
                    target: listenOpts.target,
                    triggers: listenOpts.triggers,
                    show: show,
                    hide: hide,
                    toggle: toggle
                });
                return this;
            };
        /**
         * @return {?}
         */
        ComponentLoader.prototype._removeGlobalListener = /**
         * @return {?}
         */
            function () {
                if (this._globalListener) {
                    this._globalListener();
                    this._globalListener = null;
                }
            };
        /**
         * @param {?} vRef
         * @param {?} template
         * @return {?}
         */
        ComponentLoader.prototype.attachInline = /**
         * @param {?} vRef
         * @param {?} template
         * @return {?}
         */
            function (vRef, /* tslint:disable-next-line: no-any*/ 
            /* tslint:disable-next-line: no-any*/
            template) {
                this._inlineViewRef = vRef.createEmbeddedView(template);
                return this;
            };
        /**
         * @return {?}
         */
        ComponentLoader.prototype._registerOutsideClick = /**
         * @return {?}
         */
            function () {
                var _this = this;
                if (!this._componentRef || !this._componentRef.location) {
                    return;
                }
                // why: should run after first event bubble
                if (this._listenOpts.outsideClick) {
                    var /** @type {?} */ target_1 = this._componentRef.location.nativeElement;
                    setTimeout(function () {
                        _this._globalListener = utils.registerOutsideClick(_this._renderer, {
                            targets: [target_1, _this._elementRef.nativeElement],
                            outsideClick: _this._listenOpts.outsideClick,
                            hide: function () { return _this._listenOpts.hide(); }
                        });
                    });
                }
                if (this._listenOpts.outsideEsc) {
                    var /** @type {?} */ target = this._componentRef.location.nativeElement;
                    this._globalListener = utils.registerEscClick(this._renderer, {
                        targets: [target, this._elementRef.nativeElement],
                        outsideEsc: this._listenOpts.outsideEsc,
                        hide: function () { return _this._listenOpts.hide(); }
                    });
                }
            };
        /**
         * @return {?}
         */
        ComponentLoader.prototype.getInnerComponent = /**
         * @return {?}
         */
            function () {
                return this._innerComponent;
            };
        /**
         * @return {?}
         */
        ComponentLoader.prototype._subscribePositioning = /**
         * @return {?}
         */
            function () {
                var _this = this;
                if (this._zoneSubscription || !this.attachment) {
                    return;
                }
                this._zoneSubscription = this._ngZone.onStable.subscribe(function () {
                    if (!_this._componentRef) {
                        return;
                    }
                    _this._posService.position({
                        element: _this._componentRef.location,
                        target: _this._elementRef,
                        attachment: _this.attachment,
                        appendToBody: _this.container === 'body'
                    });
                });
            };
        /**
         * @return {?}
         */
        ComponentLoader.prototype._unsubscribePositioning = /**
         * @return {?}
         */
            function () {
                if (!this._zoneSubscription) {
                    return;
                }
                this._zoneSubscription.unsubscribe();
                this._zoneSubscription = null;
            };
        /**
         * @param {?} content
         * @param {?=} context
         * @param {?=} initialState
         * @return {?}
         */
        ComponentLoader.prototype._getContentRef = /**
         * @param {?} content
         * @param {?=} context
         * @param {?=} initialState
         * @return {?}
         */
            function (/* tslint:disable-next-line: no-any*/ 
            /* tslint:disable-next-line: no-any*/
            content, /* tslint:disable-next-line: no-any*/ 
            /* tslint:disable-next-line: no-any*/
            context, /* tslint:disable-next-line: no-any*/ 
            /* tslint:disable-next-line: no-any*/
            initialState) {
                if (!content) {
                    return new ContentRef([]);
                }
                if (content instanceof core.TemplateRef) {
                    if (this._viewContainerRef) {
                        var /** @type {?} */ _viewRef = this._viewContainerRef
                            .createEmbeddedView(content, context);
                        _viewRef.markForCheck();
                        return new ContentRef([_viewRef.rootNodes], _viewRef);
                    }
                    var /** @type {?} */ viewRef = content.createEmbeddedView({});
                    this._applicationRef.attachView(viewRef);
                    return new ContentRef([viewRef.rootNodes], viewRef);
                }
                if (typeof content === 'function') {
                    var /** @type {?} */ contentCmptFactory = this._componentFactoryResolver.resolveComponentFactory(content);
                    var /** @type {?} */ modalContentInjector = core.Injector.create({
                        providers: this._providers,
                        parent: this._injector
                    });
                    var /** @type {?} */ componentRef = contentCmptFactory.create(modalContentInjector);
                    Object.assign(componentRef.instance, initialState);
                    this._applicationRef.attachView(componentRef.hostView);
                    return new ContentRef([[componentRef.location.nativeElement]], componentRef.hostView, componentRef);
                }
                return new ContentRef([[this._renderer.createText("" + content)]]);
            };
        return ComponentLoader;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var ComponentLoaderFactory = (function () {
        function ComponentLoaderFactory(_componentFactoryResolver, _ngZone, _injector, _posService, _applicationRef) {
            this._componentFactoryResolver = _componentFactoryResolver;
            this._ngZone = _ngZone;
            this._injector = _injector;
            this._posService = _posService;
            this._applicationRef = _applicationRef;
        }
        /**
         *
         * @param _elementRef
         * @param _viewContainerRef
         * @param _renderer
         */
        /**
         *
         * @template T
         * @param {?} _elementRef
         * @param {?} _viewContainerRef
         * @param {?} _renderer
         * @return {?}
         */
        ComponentLoaderFactory.prototype.createLoader = /**
         *
         * @template T
         * @param {?} _elementRef
         * @param {?} _viewContainerRef
         * @param {?} _renderer
         * @return {?}
         */
            function (_elementRef, _viewContainerRef, _renderer) {
                return new ComponentLoader(_viewContainerRef, _renderer, _elementRef, this._injector, this._componentFactoryResolver, this._ngZone, this._applicationRef, this._posService);
            };
        ComponentLoaderFactory.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        ComponentLoaderFactory.ctorParameters = function () {
            return [
                { type: core.ComponentFactoryResolver, },
                { type: core.NgZone, },
                { type: core.Injector, },
                { type: positioning.PositioningService, },
                { type: core.ApplicationRef, },
            ];
        };
        return ComponentLoaderFactory;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */

    exports.BsComponentRef = BsComponentRef;
    exports.ComponentLoader = ComponentLoader;
    exports.ComponentLoaderFactory = ComponentLoaderFactory;
    exports.ContentRef = ContentRef;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWJvb3RzdHJhcC1jb21wb25lbnQtbG9hZGVyLnVtZC5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vbmd4LWJvb3RzdHJhcC9jb21wb25lbnQtbG9hZGVyL2JzLWNvbXBvbmVudC1yZWYuY2xhc3MudHMiLCJuZzovL25neC1ib290c3RyYXAvY29tcG9uZW50LWxvYWRlci9jb250ZW50LXJlZi5jbGFzcy50cyIsIm5nOi8vbmd4LWJvb3RzdHJhcC9jb21wb25lbnQtbG9hZGVyL2NvbXBvbmVudC1sb2FkZXIuY2xhc3MudHMiLCJuZzovL25neC1ib290c3RyYXAvY29tcG9uZW50LWxvYWRlci9jb21wb25lbnQtbG9hZGVyLmZhY3RvcnkudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVGVtcGxhdGVSZWYsIFZpZXdDb250YWluZXJSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuZXhwb3J0IGNsYXNzIEJzQ29tcG9uZW50UmVmPFQ+IHtcbiAgdGVtcGxhdGVSZWY6IFRlbXBsYXRlUmVmPFQ+O1xuICB2aWV3Q29udGFpbmVyOiBWaWV3Q29udGFpbmVyUmVmO1xufVxuIiwiLyoqXG4gKiBAY29weXJpZ2h0IFZhbG9yIFNvZnR3YXJlXG4gKiBAY29weXJpZ2h0IEFuZ3VsYXIgbmctYm9vdHN0cmFwIHRlYW1cbiAqL1xuXG5pbXBvcnQgeyBDb21wb25lbnRSZWYsIFZpZXdSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuZXhwb3J0IGNsYXNzIENvbnRlbnRSZWYge1xuICAvKiB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IG5vLWFueSAqL1xuICBub2RlczogYW55W107XG4gIHZpZXdSZWY/OiBWaWV3UmVmO1xuICAvKiB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IG5vLWFueSAqL1xuICBjb21wb25lbnRSZWY/OiBDb21wb25lbnRSZWY8YW55PjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICAvKiB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IG5vLWFueSAqL1xuICAgIG5vZGVzOiBhbnlbXSxcbiAgICB2aWV3UmVmPzogVmlld1JlZixcbiAgICAvKiB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IG5vLWFueSAqL1xuICAgIGNvbXBvbmVudFJlZj86IENvbXBvbmVudFJlZjxhbnk+XG4gICkge1xuICAgIHRoaXMubm9kZXMgPSBub2RlcztcbiAgICB0aGlzLnZpZXdSZWYgPSB2aWV3UmVmO1xuICAgIHRoaXMuY29tcG9uZW50UmVmID0gY29tcG9uZW50UmVmO1xuICB9XG59XG4iLCIvLyB0c2xpbnQ6ZGlzYWJsZTptYXgtZmlsZS1saW5lLWNvdW50XG4vLyB0b2RvOiBhZGQgZGVsYXkgc3VwcG9ydFxuLy8gdG9kbzogbWVyZ2UgZXZlbnRzIG9uU2hvdywgb25TaG93biwgZXRjLi4uXG4vLyB0b2RvOiBhZGQgZ2xvYmFsIHBvc2l0aW9uaW5nIGNvbmZpZ3VyYXRpb24/XG5pbXBvcnQge1xuICBBcHBsaWNhdGlvblJlZixcbiAgQ29tcG9uZW50RmFjdG9yeSxcbiAgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxuICBDb21wb25lbnRSZWYsXG4gIEVsZW1lbnRSZWYsXG4gIEVtYmVkZGVkVmlld1JlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBJbmplY3RvcixcbiAgTmdab25lLFxuICBSZW5kZXJlcjIsXG4gIFN0YXRpY1Byb3ZpZGVyLFxuICBUZW1wbGF0ZVJlZixcbiAgVHlwZSxcbiAgVmlld0NvbnRhaW5lclJlZlxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgUG9zaXRpb25pbmdPcHRpb25zLCBQb3NpdGlvbmluZ1NlcnZpY2UgfSBmcm9tICduZ3gtYm9vdHN0cmFwL3Bvc2l0aW9uaW5nJztcblxuaW1wb3J0IHtcbiAgbGlzdGVuVG9UcmlnZ2Vyc1YyLFxuICByZWdpc3RlckVzY0NsaWNrLFxuICByZWdpc3Rlck91dHNpZGVDbGlja1xufSBmcm9tICduZ3gtYm9vdHN0cmFwL3V0aWxzJztcblxuaW1wb3J0IHsgQ29udGVudFJlZiB9IGZyb20gJy4vY29udGVudC1yZWYuY2xhc3MnO1xuaW1wb3J0IHsgTGlzdGVuT3B0aW9ucyB9IGZyb20gJy4vbGlzdGVuLW9wdGlvbnMubW9kZWwnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5cbmV4cG9ydCBjbGFzcyBDb21wb25lbnRMb2FkZXI8VD4ge1xuICBvbkJlZm9yZVNob3c6IEV2ZW50RW1pdHRlcjx2b2lkPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgLyogdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBuby1hbnkqL1xuICBvblNob3duOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgLyogdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBuby1hbnkqL1xuICBvbkJlZm9yZUhpZGU6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBvbkhpZGRlbjogRXZlbnRFbWl0dGVyPGJvb2xlYW4+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIGluc3RhbmNlOiBUO1xuICBfY29tcG9uZW50UmVmOiBDb21wb25lbnRSZWY8VD47XG4gIF9pbmxpbmVWaWV3UmVmOiBFbWJlZGRlZFZpZXdSZWY8VD47XG5cbiAgcHJpdmF0ZSBfcHJvdmlkZXJzOiBTdGF0aWNQcm92aWRlcltdID0gW107XG4gIHByaXZhdGUgX2NvbXBvbmVudEZhY3Rvcnk6IENvbXBvbmVudEZhY3Rvcnk8VD47XG4gIHByaXZhdGUgX3pvbmVTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcbiAgcHJpdmF0ZSBfY29udGVudFJlZjogQ29udGVudFJlZjtcbiAgcHJpdmF0ZSBfaW5uZXJDb21wb25lbnQ6IENvbXBvbmVudFJlZjxUPjtcblxuICBwcml2YXRlIF91bnJlZ2lzdGVyTGlzdGVuZXJzRm46IEZ1bmN0aW9uO1xuXG4gIGdldCBpc1Nob3duKCk6IGJvb2xlYW4ge1xuICAgIGlmICh0aGlzLl9pc0hpZGluZykge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHJldHVybiAhIXRoaXMuX2NvbXBvbmVudFJlZjtcbiAgfVxuXG4gIHByaXZhdGUgX2lzSGlkaW5nID0gZmFsc2U7XG5cbiAgLyoqXG4gICAqIFBsYWNlbWVudCBvZiBhIGNvbXBvbmVudC4gQWNjZXB0czogXCJ0b3BcIiwgXCJib3R0b21cIiwgXCJsZWZ0XCIsIFwicmlnaHRcIlxuICAgKi9cbiAgcHJpdmF0ZSBhdHRhY2htZW50OiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIEEgc2VsZWN0b3Igc3BlY2lmeWluZyB0aGUgZWxlbWVudCB0aGUgcG9wb3ZlciBzaG91bGQgYmUgYXBwZW5kZWQgdG8uXG4gICAqIEN1cnJlbnRseSBvbmx5IHN1cHBvcnRzIFwiYm9keVwiLlxuICAgKi9cbiAgLyogdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBuby1hbnkqL1xuICBwcml2YXRlIGNvbnRhaW5lcjogc3RyaW5nIHwgRWxlbWVudFJlZiB8IGFueTtcblxuICAvKipcbiAgICogU3BlY2lmaWVzIGV2ZW50cyB0aGF0IHNob3VsZCB0cmlnZ2VyLiBTdXBwb3J0cyBhIHNwYWNlIHNlcGFyYXRlZCBsaXN0IG9mXG4gICAqIGV2ZW50IG5hbWVzLlxuICAgKi9cbiAgcHJpdmF0ZSB0cmlnZ2Vyczogc3RyaW5nO1xuXG4gIHByaXZhdGUgX2xpc3Rlbk9wdHM6IExpc3Rlbk9wdGlvbnMgPSB7fTtcbiAgcHJpdmF0ZSBfZ2xvYmFsTGlzdGVuZXIgPSBGdW5jdGlvbi5wcm90b3R5cGU7XG5cbiAgLyoqXG4gICAqIERvIG5vdCB1c2UgdGhpcyBkaXJlY3RseSwgaXQgc2hvdWxkIGJlIGluc3RhbmNlZCB2aWFcbiAgICogYENvbXBvbmVudExvYWRGYWN0b3J5LmF0dGFjaGBcbiAgICogQGludGVybmFsXG4gICAqL1xuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmVcbiAgcHVibGljIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgX3ZpZXdDb250YWluZXJSZWY6IFZpZXdDb250YWluZXJSZWYsXG4gICAgcHJpdmF0ZSBfcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICBwcml2YXRlIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgIHByaXZhdGUgX2luamVjdG9yOiBJbmplY3RvcixcbiAgICBwcml2YXRlIF9jb21wb25lbnRGYWN0b3J5UmVzb2x2ZXI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgICBwcml2YXRlIF9uZ1pvbmU6IE5nWm9uZSxcbiAgICBwcml2YXRlIF9hcHBsaWNhdGlvblJlZjogQXBwbGljYXRpb25SZWYsXG4gICAgcHJpdmF0ZSBfcG9zU2VydmljZTogUG9zaXRpb25pbmdTZXJ2aWNlXG4gICkge31cblxuICBhdHRhY2goY29tcFR5cGU6IFR5cGU8VD4pOiBDb21wb25lbnRMb2FkZXI8VD4ge1xuICAgIHRoaXMuX2NvbXBvbmVudEZhY3RvcnkgPSB0aGlzLl9jb21wb25lbnRGYWN0b3J5UmVzb2x2ZXJcbiAgICAgIC5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeTxUPihjb21wVHlwZSk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8vIHRvZG86IGFkZCBiZWhhdmlvdXI6IHRvIHRhcmdldCBlbGVtZW50LCBgYm9keWAsIGN1c3RvbSBlbGVtZW50XG4gIHRvKGNvbnRhaW5lcj86IHN0cmluZyk6IENvbXBvbmVudExvYWRlcjxUPiB7XG4gICAgdGhpcy5jb250YWluZXIgPSBjb250YWluZXIgfHwgdGhpcy5jb250YWluZXI7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHBvc2l0aW9uKG9wdHM/OiBQb3NpdGlvbmluZ09wdGlvbnMpOiBDb21wb25lbnRMb2FkZXI8VD4ge1xuICAgIHRoaXMuYXR0YWNobWVudCA9IG9wdHMuYXR0YWNobWVudCB8fCB0aGlzLmF0dGFjaG1lbnQ7XG4gICAgdGhpcy5fZWxlbWVudFJlZiA9IChvcHRzLnRhcmdldCBhcyBFbGVtZW50UmVmKSB8fCB0aGlzLl9lbGVtZW50UmVmO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBwcm92aWRlKHByb3ZpZGVyOiBTdGF0aWNQcm92aWRlcik6IENvbXBvbmVudExvYWRlcjxUPiB7XG4gICAgdGhpcy5fcHJvdmlkZXJzLnB1c2gocHJvdmlkZXIpO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvLyB0b2RvOiBhcHBlbmRDaGlsZCB0byBlbGVtZW50IG9yIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGhpcy5jb250YWluZXIpXG5cbiAgc2hvdyhvcHRzOiB7XG4gICAgLyogdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBuby1hbnkqL1xuICAgIGNvbnRlbnQ/OiBzdHJpbmcgfCBUZW1wbGF0ZVJlZjxhbnk+O1xuICAgIC8qIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogbm8tYW55Ki9cbiAgICBjb250ZXh0PzogYW55O1xuICAgIC8qIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogbm8tYW55Ki9cbiAgICBpbml0aWFsU3RhdGU/OiBhbnk7XG4gICAgLyogdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBuby1hbnkqL1xuICAgIFtrZXk6IHN0cmluZ106IGFueTtcbiAgfSA9IHt9XG4gICk6IENvbXBvbmVudFJlZjxUPiB7XG5cbiAgICB0aGlzLl9zdWJzY3JpYmVQb3NpdGlvbmluZygpO1xuICAgIHRoaXMuX2lubmVyQ29tcG9uZW50ID0gbnVsbDtcblxuICAgIGlmICghdGhpcy5fY29tcG9uZW50UmVmKSB7XG4gICAgICB0aGlzLm9uQmVmb3JlU2hvdy5lbWl0KCk7XG4gICAgICB0aGlzLl9jb250ZW50UmVmID0gdGhpcy5fZ2V0Q29udGVudFJlZihvcHRzLmNvbnRlbnQsIG9wdHMuY29udGV4dCwgb3B0cy5pbml0aWFsU3RhdGUpO1xuXG4gICAgICBjb25zdCBpbmplY3RvciA9IEluamVjdG9yLmNyZWF0ZSh7XG4gICAgICAgIHByb3ZpZGVyczogdGhpcy5fcHJvdmlkZXJzLFxuICAgICAgICBwYXJlbnQ6IHRoaXMuX2luamVjdG9yXG4gICAgICB9KTtcblxuICAgICAgdGhpcy5fY29tcG9uZW50UmVmID0gdGhpcy5fY29tcG9uZW50RmFjdG9yeS5jcmVhdGUoaW5qZWN0b3IsIHRoaXMuX2NvbnRlbnRSZWYubm9kZXMpO1xuICAgICAgdGhpcy5fYXBwbGljYXRpb25SZWYuYXR0YWNoVmlldyh0aGlzLl9jb21wb25lbnRSZWYuaG9zdFZpZXcpO1xuICAgICAgLy8gdGhpcy5fY29tcG9uZW50UmVmID0gdGhpcy5fdmlld0NvbnRhaW5lclJlZlxuICAgICAgLy8gICAuY3JlYXRlQ29tcG9uZW50KHRoaXMuX2NvbXBvbmVudEZhY3RvcnksIDAsIGluamVjdG9yLCB0aGlzLl9jb250ZW50UmVmLm5vZGVzKTtcbiAgICAgIHRoaXMuaW5zdGFuY2UgPSB0aGlzLl9jb21wb25lbnRSZWYuaW5zdGFuY2U7XG5cbiAgICAgIE9iamVjdC5hc3NpZ24odGhpcy5fY29tcG9uZW50UmVmLmluc3RhbmNlLCBvcHRzKTtcblxuICAgICAgaWYgKHRoaXMuY29udGFpbmVyIGluc3RhbmNlb2YgRWxlbWVudFJlZikge1xuICAgICAgICB0aGlzLmNvbnRhaW5lci5uYXRpdmVFbGVtZW50LmFwcGVuZENoaWxkKFxuICAgICAgICAgIHRoaXMuX2NvbXBvbmVudFJlZi5sb2NhdGlvbi5uYXRpdmVFbGVtZW50XG4gICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLmNvbnRhaW5lciA9PT0gJ2JvZHknICYmIHR5cGVvZiBkb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgZG9jdW1lbnRcbiAgICAgICAgICAucXVlcnlTZWxlY3Rvcih0aGlzLmNvbnRhaW5lciBhcyBzdHJpbmcpXG4gICAgICAgICAgLmFwcGVuZENoaWxkKHRoaXMuX2NvbXBvbmVudFJlZi5sb2NhdGlvbi5uYXRpdmVFbGVtZW50KTtcbiAgICAgIH1cblxuICAgICAgaWYgKFxuICAgICAgICAhdGhpcy5jb250YWluZXIgJiZcbiAgICAgICAgdGhpcy5fZWxlbWVudFJlZiAmJlxuICAgICAgICB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQucGFyZW50RWxlbWVudFxuICAgICAgKSB7XG4gICAgICAgIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5wYXJlbnRFbGVtZW50LmFwcGVuZENoaWxkKFxuICAgICAgICAgIHRoaXMuX2NvbXBvbmVudFJlZi5sb2NhdGlvbi5uYXRpdmVFbGVtZW50XG4gICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgIC8vIHdlIG5lZWQgdG8gbWFudWFsbHkgaW52b2tlIGNoYW5nZSBkZXRlY3Rpb24gc2luY2UgZXZlbnRzIHJlZ2lzdGVyZWRcbiAgICAgIC8vIHZpYVxuICAgICAgLy8gUmVuZGVyZXI6Omxpc3RlbigpIGFyZSBub3QgcGlja2VkIHVwIGJ5IGNoYW5nZSBkZXRlY3Rpb24gd2l0aCB0aGVcbiAgICAgIC8vIE9uUHVzaCBzdHJhdGVneVxuICAgICAgaWYgKHRoaXMuX2NvbnRlbnRSZWYuY29tcG9uZW50UmVmKSB7XG4gICAgICAgIHRoaXMuX2lubmVyQ29tcG9uZW50ID0gdGhpcy5fY29udGVudFJlZi5jb21wb25lbnRSZWYuaW5zdGFuY2U7XG4gICAgICAgIHRoaXMuX2NvbnRlbnRSZWYuY29tcG9uZW50UmVmLmNoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICB0aGlzLl9jb250ZW50UmVmLmNvbXBvbmVudFJlZi5jaGFuZ2VEZXRlY3RvclJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICB9XG4gICAgICB0aGlzLl9jb21wb25lbnRSZWYuY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgICB0aGlzLl9jb21wb25lbnRSZWYuY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgdGhpcy5vblNob3duLmVtaXQodGhpcy5fY29tcG9uZW50UmVmLmluc3RhbmNlKTtcbiAgICB9XG5cbiAgICB0aGlzLl9yZWdpc3Rlck91dHNpZGVDbGljaygpO1xuXG4gICAgcmV0dXJuIHRoaXMuX2NvbXBvbmVudFJlZjtcbiAgfVxuXG4gIGhpZGUoKTogQ29tcG9uZW50TG9hZGVyPFQ+IHtcbiAgICBpZiAoIXRoaXMuX2NvbXBvbmVudFJlZikge1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgdGhpcy5vbkJlZm9yZUhpZGUuZW1pdCh0aGlzLl9jb21wb25lbnRSZWYuaW5zdGFuY2UpO1xuXG4gICAgY29uc3QgY29tcG9uZW50RWwgPSB0aGlzLl9jb21wb25lbnRSZWYubG9jYXRpb24ubmF0aXZlRWxlbWVudDtcbiAgICBjb21wb25lbnRFbC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGNvbXBvbmVudEVsKTtcbiAgICBpZiAodGhpcy5fY29udGVudFJlZi5jb21wb25lbnRSZWYpIHtcbiAgICAgIHRoaXMuX2NvbnRlbnRSZWYuY29tcG9uZW50UmVmLmRlc3Ryb3koKTtcbiAgICB9XG4gICAgdGhpcy5fY29tcG9uZW50UmVmLmRlc3Ryb3koKTtcbiAgICBpZiAodGhpcy5fdmlld0NvbnRhaW5lclJlZiAmJiB0aGlzLl9jb250ZW50UmVmLnZpZXdSZWYpIHtcbiAgICAgIHRoaXMuX3ZpZXdDb250YWluZXJSZWYucmVtb3ZlKFxuICAgICAgICB0aGlzLl92aWV3Q29udGFpbmVyUmVmLmluZGV4T2YodGhpcy5fY29udGVudFJlZi52aWV3UmVmKVxuICAgICAgKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuX2NvbnRlbnRSZWYudmlld1JlZikge1xuICAgICAgdGhpcy5fY29udGVudFJlZi52aWV3UmVmLmRlc3Ryb3koKTtcbiAgICB9XG5cbiAgICB0aGlzLl9jb250ZW50UmVmID0gbnVsbDtcbiAgICB0aGlzLl9jb21wb25lbnRSZWYgPSBudWxsO1xuICAgIHRoaXMuX3JlbW92ZUdsb2JhbExpc3RlbmVyKCk7XG5cbiAgICB0aGlzLm9uSGlkZGVuLmVtaXQoKTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgdG9nZ2xlKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmlzU2hvd24pIHtcbiAgICAgIHRoaXMuaGlkZSgpO1xuXG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5zaG93KCk7XG4gIH1cblxuICBkaXNwb3NlKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmlzU2hvd24pIHtcbiAgICAgIHRoaXMuaGlkZSgpO1xuICAgIH1cblxuICAgIHRoaXMuX3Vuc3Vic2NyaWJlUG9zaXRpb25pbmcoKTtcblxuICAgIGlmICh0aGlzLl91bnJlZ2lzdGVyTGlzdGVuZXJzRm4pIHtcbiAgICAgIHRoaXMuX3VucmVnaXN0ZXJMaXN0ZW5lcnNGbigpO1xuICAgIH1cbiAgfVxuXG4gIGxpc3RlbihsaXN0ZW5PcHRzOiBMaXN0ZW5PcHRpb25zKTogQ29tcG9uZW50TG9hZGVyPFQ+IHtcbiAgICB0aGlzLnRyaWdnZXJzID0gbGlzdGVuT3B0cy50cmlnZ2VycyB8fCB0aGlzLnRyaWdnZXJzO1xuICAgIHRoaXMuX2xpc3Rlbk9wdHMub3V0c2lkZUNsaWNrID0gbGlzdGVuT3B0cy5vdXRzaWRlQ2xpY2s7XG4gICAgdGhpcy5fbGlzdGVuT3B0cy5vdXRzaWRlRXNjID0gbGlzdGVuT3B0cy5vdXRzaWRlRXNjO1xuICAgIGxpc3Rlbk9wdHMudGFyZ2V0ID0gbGlzdGVuT3B0cy50YXJnZXQgfHwgdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50O1xuXG4gICAgY29uc3QgaGlkZSA9ICh0aGlzLl9saXN0ZW5PcHRzLmhpZGUgPSAoKSA9PlxuICAgICAgbGlzdGVuT3B0cy5oaWRlID8gbGlzdGVuT3B0cy5oaWRlKCkgOiB2b2lkIHRoaXMuaGlkZSgpKTtcbiAgICBjb25zdCBzaG93ID0gKHRoaXMuX2xpc3Rlbk9wdHMuc2hvdyA9IChyZWdpc3RlckhpZGU6IEZ1bmN0aW9uKSA9PiB7XG4gICAgICBsaXN0ZW5PcHRzLnNob3cgPyBsaXN0ZW5PcHRzLnNob3cocmVnaXN0ZXJIaWRlKSA6IHRoaXMuc2hvdyhyZWdpc3RlckhpZGUpO1xuICAgICAgcmVnaXN0ZXJIaWRlKCk7XG4gICAgfSk7XG5cbiAgICBjb25zdCB0b2dnbGUgPSAocmVnaXN0ZXJIaWRlOiBGdW5jdGlvbikgPT4ge1xuICAgICAgdGhpcy5pc1Nob3duID8gaGlkZSgpIDogc2hvdyhyZWdpc3RlckhpZGUpO1xuICAgIH07XG5cbiAgICB0aGlzLl91bnJlZ2lzdGVyTGlzdGVuZXJzRm4gPSBsaXN0ZW5Ub1RyaWdnZXJzVjIodGhpcy5fcmVuZGVyZXIsIHtcbiAgICAgIHRhcmdldDogbGlzdGVuT3B0cy50YXJnZXQsXG4gICAgICB0cmlnZ2VyczogbGlzdGVuT3B0cy50cmlnZ2VycyxcbiAgICAgIHNob3csXG4gICAgICBoaWRlLFxuICAgICAgdG9nZ2xlXG4gICAgfSk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIF9yZW1vdmVHbG9iYWxMaXN0ZW5lcigpIHtcbiAgICBpZiAodGhpcy5fZ2xvYmFsTGlzdGVuZXIpIHtcbiAgICAgIHRoaXMuX2dsb2JhbExpc3RlbmVyKCk7XG4gICAgICB0aGlzLl9nbG9iYWxMaXN0ZW5lciA9IG51bGw7XG4gICAgfVxuICB9XG5cbiAgYXR0YWNoSW5saW5lKFxuICAgIHZSZWY6IFZpZXdDb250YWluZXJSZWYsXG4gICAgLyogdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBuby1hbnkqL1xuICAgIHRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+XG4gICk6IENvbXBvbmVudExvYWRlcjxUPiB7XG4gICAgdGhpcy5faW5saW5lVmlld1JlZiA9IHZSZWYuY3JlYXRlRW1iZWRkZWRWaWV3KHRlbXBsYXRlKTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgX3JlZ2lzdGVyT3V0c2lkZUNsaWNrKCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5fY29tcG9uZW50UmVmIHx8ICF0aGlzLl9jb21wb25lbnRSZWYubG9jYXRpb24pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgLy8gd2h5OiBzaG91bGQgcnVuIGFmdGVyIGZpcnN0IGV2ZW50IGJ1YmJsZVxuICAgIGlmICh0aGlzLl9saXN0ZW5PcHRzLm91dHNpZGVDbGljaykge1xuICAgICAgY29uc3QgdGFyZ2V0ID0gdGhpcy5fY29tcG9uZW50UmVmLmxvY2F0aW9uLm5hdGl2ZUVsZW1lbnQ7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgdGhpcy5fZ2xvYmFsTGlzdGVuZXIgPSByZWdpc3Rlck91dHNpZGVDbGljayh0aGlzLl9yZW5kZXJlciwge1xuICAgICAgICAgIHRhcmdldHM6IFt0YXJnZXQsIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudF0sXG4gICAgICAgICAgb3V0c2lkZUNsaWNrOiB0aGlzLl9saXN0ZW5PcHRzLm91dHNpZGVDbGljayxcbiAgICAgICAgICBoaWRlOiAoKSA9PiB0aGlzLl9saXN0ZW5PcHRzLmhpZGUoKVxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICBpZiAodGhpcy5fbGlzdGVuT3B0cy5vdXRzaWRlRXNjKSB7XG4gICAgICBjb25zdCB0YXJnZXQgPSB0aGlzLl9jb21wb25lbnRSZWYubG9jYXRpb24ubmF0aXZlRWxlbWVudDtcbiAgICAgIHRoaXMuX2dsb2JhbExpc3RlbmVyID0gcmVnaXN0ZXJFc2NDbGljayh0aGlzLl9yZW5kZXJlciwge1xuICAgICAgICB0YXJnZXRzOiBbdGFyZ2V0LCB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnRdLFxuICAgICAgICBvdXRzaWRlRXNjOiB0aGlzLl9saXN0ZW5PcHRzLm91dHNpZGVFc2MsXG4gICAgICAgIGhpZGU6ICgpID0+IHRoaXMuX2xpc3Rlbk9wdHMuaGlkZSgpXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBnZXRJbm5lckNvbXBvbmVudCgpOiBDb21wb25lbnRSZWY8VD4ge1xuICAgIHJldHVybiB0aGlzLl9pbm5lckNvbXBvbmVudDtcbiAgfVxuXG4gIHByaXZhdGUgX3N1YnNjcmliZVBvc2l0aW9uaW5nKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl96b25lU3Vic2NyaXB0aW9uIHx8ICF0aGlzLmF0dGFjaG1lbnQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLl96b25lU3Vic2NyaXB0aW9uID0gdGhpcy5fbmdab25lLm9uU3RhYmxlLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICBpZiAoIXRoaXMuX2NvbXBvbmVudFJlZikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICB0aGlzLl9wb3NTZXJ2aWNlLnBvc2l0aW9uKHtcbiAgICAgICAgZWxlbWVudDogdGhpcy5fY29tcG9uZW50UmVmLmxvY2F0aW9uLFxuICAgICAgICB0YXJnZXQ6IHRoaXMuX2VsZW1lbnRSZWYsXG4gICAgICAgIGF0dGFjaG1lbnQ6IHRoaXMuYXR0YWNobWVudCxcbiAgICAgICAgYXBwZW5kVG9Cb2R5OiB0aGlzLmNvbnRhaW5lciA9PT0gJ2JvZHknXG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX3Vuc3Vic2NyaWJlUG9zaXRpb25pbmcoKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLl96b25lU3Vic2NyaXB0aW9uKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuX3pvbmVTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl96b25lU3Vic2NyaXB0aW9uID0gbnVsbDtcbiAgfVxuXG4gIHByaXZhdGUgX2dldENvbnRlbnRSZWYoXG4gICAgLyogdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBuby1hbnkqL1xuICAgIGNvbnRlbnQ6IHN0cmluZyB8IFRlbXBsYXRlUmVmPGFueT4gfCBhbnksXG4gICAgLyogdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBuby1hbnkqL1xuICAgIGNvbnRleHQ/OiBhbnksXG4gICAgLyogdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBuby1hbnkqL1xuICAgIGluaXRpYWxTdGF0ZT86IGFueVxuICApOiBDb250ZW50UmVmIHtcbiAgICBpZiAoIWNvbnRlbnQpIHtcbiAgICAgIHJldHVybiBuZXcgQ29udGVudFJlZihbXSk7XG4gICAgfVxuXG4gICAgaWYgKGNvbnRlbnQgaW5zdGFuY2VvZiBUZW1wbGF0ZVJlZikge1xuICAgICAgaWYgKHRoaXMuX3ZpZXdDb250YWluZXJSZWYpIHtcbiAgICAgICAgY29uc3QgX3ZpZXdSZWYgPSB0aGlzLl92aWV3Q29udGFpbmVyUmVmXG4gICAgICAgICAgLmNyZWF0ZUVtYmVkZGVkVmlldzxUZW1wbGF0ZVJlZjxUPj4oY29udGVudCwgY29udGV4dCk7XG4gICAgICAgIF92aWV3UmVmLm1hcmtGb3JDaGVjaygpO1xuXG4gICAgICAgIHJldHVybiBuZXcgQ29udGVudFJlZihbX3ZpZXdSZWYucm9vdE5vZGVzXSwgX3ZpZXdSZWYpO1xuICAgICAgfVxuICAgICAgY29uc3Qgdmlld1JlZiA9IGNvbnRlbnQuY3JlYXRlRW1iZWRkZWRWaWV3KHt9KTtcbiAgICAgIHRoaXMuX2FwcGxpY2F0aW9uUmVmLmF0dGFjaFZpZXcodmlld1JlZik7XG5cbiAgICAgIHJldHVybiBuZXcgQ29udGVudFJlZihbdmlld1JlZi5yb290Tm9kZXNdLCB2aWV3UmVmKTtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIGNvbnRlbnQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGNvbnN0IGNvbnRlbnRDbXB0RmFjdG9yeSA9IHRoaXMuX2NvbXBvbmVudEZhY3RvcnlSZXNvbHZlci5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeShcbiAgICAgICAgY29udGVudFxuICAgICAgKTtcblxuICAgICAgY29uc3QgbW9kYWxDb250ZW50SW5qZWN0b3IgPSBJbmplY3Rvci5jcmVhdGUoe1xuICAgICAgICBwcm92aWRlcnM6IHRoaXMuX3Byb3ZpZGVycyxcbiAgICAgICAgcGFyZW50OiB0aGlzLl9pbmplY3RvclxuICAgICAgfSk7XG5cbiAgICAgIGNvbnN0IGNvbXBvbmVudFJlZiA9IGNvbnRlbnRDbXB0RmFjdG9yeS5jcmVhdGUobW9kYWxDb250ZW50SW5qZWN0b3IpO1xuICAgICAgT2JqZWN0LmFzc2lnbihjb21wb25lbnRSZWYuaW5zdGFuY2UsIGluaXRpYWxTdGF0ZSk7XG4gICAgICB0aGlzLl9hcHBsaWNhdGlvblJlZi5hdHRhY2hWaWV3KGNvbXBvbmVudFJlZi5ob3N0Vmlldyk7XG5cbiAgICAgIHJldHVybiBuZXcgQ29udGVudFJlZihcbiAgICAgICAgW1tjb21wb25lbnRSZWYubG9jYXRpb24ubmF0aXZlRWxlbWVudF1dLFxuICAgICAgICBjb21wb25lbnRSZWYuaG9zdFZpZXcsXG4gICAgICAgIGNvbXBvbmVudFJlZlxuICAgICAgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IENvbnRlbnRSZWYoW1t0aGlzLl9yZW5kZXJlci5jcmVhdGVUZXh0KGAke2NvbnRlbnR9YCldXSk7XG4gIH1cbn1cbiIsImltcG9ydCB7XG4gIEFwcGxpY2F0aW9uUmVmLCBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsIEVsZW1lbnRSZWYsIEluamVjdGFibGUsIEluamVjdG9yLFxuICBOZ1pvbmUsIFJlbmRlcmVyMiwgVmlld0NvbnRhaW5lclJlZlxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbXBvbmVudExvYWRlciB9IGZyb20gJy4vY29tcG9uZW50LWxvYWRlci5jbGFzcyc7XG5pbXBvcnQgeyBQb3NpdGlvbmluZ1NlcnZpY2UgfSBmcm9tICduZ3gtYm9vdHN0cmFwL3Bvc2l0aW9uaW5nJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIENvbXBvbmVudExvYWRlckZhY3Rvcnkge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9jb21wb25lbnRGYWN0b3J5UmVzb2x2ZXI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgICAgICAgICAgICAgcHJpdmF0ZSBfbmdab25lOiBOZ1pvbmUsXG4gICAgICAgICAgICAgIHByaXZhdGUgX2luamVjdG9yOiBJbmplY3RvcixcbiAgICAgICAgICAgICAgcHJpdmF0ZSBfcG9zU2VydmljZTogUG9zaXRpb25pbmdTZXJ2aWNlLFxuICAgICAgICAgICAgICBwcml2YXRlIF9hcHBsaWNhdGlvblJlZjogQXBwbGljYXRpb25SZWYpIHt9XG5cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSBfZWxlbWVudFJlZlxuICAgKiBAcGFyYW0gX3ZpZXdDb250YWluZXJSZWZcbiAgICogQHBhcmFtIF9yZW5kZXJlclxuICAgKi9cbiAgY3JlYXRlTG9hZGVyPFQ+KF9lbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgICAgICAgICAgICAgICAgX3ZpZXdDb250YWluZXJSZWY6IFZpZXdDb250YWluZXJSZWYsXG4gICAgICAgICAgICAgICAgICBfcmVuZGVyZXI6IFJlbmRlcmVyMik6IENvbXBvbmVudExvYWRlcjxUPiB7XG4gICAgcmV0dXJuIG5ldyBDb21wb25lbnRMb2FkZXI8VD4oXG4gICAgICBfdmlld0NvbnRhaW5lclJlZixcbiAgICAgIF9yZW5kZXJlcixcbiAgICAgIF9lbGVtZW50UmVmLFxuICAgICAgdGhpcy5faW5qZWN0b3IsXG4gICAgICB0aGlzLl9jb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gICAgICB0aGlzLl9uZ1pvbmUsXG4gICAgICB0aGlzLl9hcHBsaWNhdGlvblJlZixcbiAgICAgIHRoaXMuX3Bvc1NlcnZpY2VcbiAgICApO1xuICB9XG59XG4iXSwibmFtZXMiOlsiRXZlbnRFbWl0dGVyIiwiSW5qZWN0b3IiLCJFbGVtZW50UmVmIiwibGlzdGVuVG9UcmlnZ2Vyc1YyIiwicmVnaXN0ZXJPdXRzaWRlQ2xpY2siLCJyZWdpc3RlckVzY0NsaWNrIiwiVGVtcGxhdGVSZWYiLCJJbmplY3RhYmxlIiwiQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyIiwiTmdab25lIiwiUG9zaXRpb25pbmdTZXJ2aWNlIiwiQXBwbGljYXRpb25SZWYiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFFQTs7UUFBQTs7OzZCQUZBO1FBS0M7Ozs7Ozs7Ozs7QUNFRCxRQUFBO1FBT0U7O1FBRUUsS0FBWSxFQUNaLE9BQWlCOztRQUVqQixZQUFnQztZQUVoQyxJ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