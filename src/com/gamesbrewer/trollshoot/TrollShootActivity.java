package com.gamesbrewer.trollshoot;

import android.os.Bundle;

import com.phonegap.*;
import com.google.ads.*;

public class TrollShootActivity extends DroidGap {
	private AdView adView;

    /** Called when the activity is first created. */
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        super.loadUrl("file:///android_asset/www/index.html");
    }
    
    @Override
    public void onDestroy() {
    	adView.destroy();
    	super.onDestroy();
    }
}