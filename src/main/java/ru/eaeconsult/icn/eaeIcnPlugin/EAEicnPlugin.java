package ru.eaeconsult.icn.eaeIcnPlugin;

import javax.servlet.http.HttpServletRequest;

import com.ibm.ecm.extension.Plugin;
import com.ibm.ecm.extension.PluginAction;
import com.ibm.ecm.extension.PluginAsyncTaskType;
import com.ibm.ecm.extension.PluginFeature;
import com.ibm.ecm.extension.PluginLayout;
import com.ibm.ecm.extension.PluginMenu;
import com.ibm.ecm.extension.PluginMenuType;
import com.ibm.ecm.extension.PluginODAuthenticationService;
import com.ibm.ecm.extension.PluginOpenAction;
import com.ibm.ecm.extension.PluginRequestFilter;
import com.ibm.ecm.extension.PluginResponseFilter;
import com.ibm.ecm.extension.PluginService;
import com.ibm.ecm.extension.PluginServiceCallbacks;
import com.ibm.ecm.extension.PluginViewerDef;
import com.ibm.ecm.extension.PluginRepositoryType;
import com.ibm.ecm.extension.PluginAPI;
import ru.eaeconsult.icn.eaeIcnPlugin.layouts.EAEMainLayout;

import java.util.Locale;


public class EAEicnPlugin extends Plugin {

    private PluginAction[] pluginActions = new PluginAction[0];
    private PluginOpenAction[] pluginOpenActions = new PluginOpenAction[0];
    private PluginRequestFilter[] pluginRequestFilters = new PluginRequestFilter[0];
    private PluginResponseFilter[] pluginResponseFilters = new PluginResponseFilter[0];
    private PluginService[] pluginServices = new PluginService[0];
    private PluginODAuthenticationService odAuthenticationService = null;
    private PluginViewerDef[] pluginViewerDefs = new PluginViewerDef[0];
    private PluginLayout[] pluginLayouts = new PluginLayout[0];
    private PluginFeature[] pluginFeatures = new PluginFeature[0];
    private PluginMenuType[] pluginMenuTypes = new PluginMenuType[0];
    private PluginMenu[] pluginMenus = new PluginMenu[0];
    private PluginRepositoryType[] pluginRepositoryTypes = new PluginRepositoryType[0];
    private PluginAPI[] pluginAPIs = new PluginAPI[0];
    private PluginAsyncTaskType[] pluginAsyncTaskTypes = new PluginAsyncTaskType[0];

    public void applicationInit(HttpServletRequest request, PluginServiceCallbacks callbacks) throws Exception {
    }

    public String getId() {
        return "EAEicnPlugin";
    }

    public String getName(Locale locale) {
        return "EAE ICN Plugin";
    }

    public String getVersion() {
        return "0.1";
    }

    public String getCopyright() {
        return "Optionally add a Copyright statement here";
    }

    public String getScript() {
        return "EAEicnPlugin.js";
    }

    public String getDebugScript() {
        return getScript();
    }

    public String getDojoModule() {
        return "EAEicnPluginDojo";
    }

    public String getCSSFileName() {
        return "EAEicnPlugin.css";
    }

    public String getDebugCSSFileName() {
        return getCSSFileName();
    }

    public String getConfigurationDijitClass() {
        return "EAEicnPluginDojo.ConfigurationPane";
    }

    public PluginOpenAction[] getOpenActions() {
        return pluginOpenActions;
    }

    public PluginRequestFilter[] getRequestFilters() {
        return pluginRequestFilters;
    }

    public PluginODAuthenticationService getODAuthenticationService() {
        return odAuthenticationService;
    }

    public PluginViewerDef[] getViewers() {
        return pluginViewerDefs;
    }

    public PluginLayout[] getLayouts() {
        if (pluginLayouts.length == 0) {
            pluginLayouts = new PluginLayout[] {
                    new EAEMainLayout()
            };
        }
        return pluginLayouts;
    }

    public PluginFeature[] getFeatures() {
        return pluginFeatures;
    }

    public PluginMenuType[] getMenuTypes() {
        return pluginMenuTypes;
    }

    public PluginMenu[] getMenus() {
        return pluginMenus;
    }

    public PluginRepositoryType[] getRepositoryTypes() {
        return pluginRepositoryTypes;
    }

    public PluginAPI[] getPluginAPIs() {
        return pluginAPIs;
    }

    public PluginAsyncTaskType[] getAsyncTaskTypes() {
        return pluginAsyncTaskTypes;
    }

    public PluginAction[] getActions() {
        return pluginActions;
    }

    public PluginService[] getServices() {
        if (pluginServices.length == 0) {
            //pluginServices = new PluginService[] {new ru.eae_consult.icn.async.services.StartTaskService()};
        }
        return pluginServices;
    }

    public PluginResponseFilter[] getResponseFilters() {
        return pluginResponseFilters;
    }

}
