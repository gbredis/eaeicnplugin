package ru.eaeconsult.icn.eaeIcnPlugin.layouts;
import com.ibm.ecm.extension.PluginLayout;

import java.util.Locale;

public class EAEMainLayout extends PluginLayout {
    @Override
    public String getId() {
        return "EAEMainLayout";
    }

    @Override
    public String getName(Locale locale) {
        return "EAEMainLayout";
    }

    @Override
    public String getLayoutClass() {
        return "EAEicnPluginDojo.layouts.EAEMainLayout";
    }
}
