'use strict';

var path = require('path');
var _ = require('macaca-utils');
var xml2map = require('xml2map');

var platform = process.env.platform || 'iOS';
platform = platform.toLowerCase();

var iOSOpts = {
  platformVersion: '9.3',
  deviceName: 'iPhone 5s',
  platformName: 'iOS',
  app: path.join(__dirname, '..', 'app', `${platform}-huajiaovr.zip`)
};

var androidOpts = {
  //udid : '4d006a744bd84177',
  platformName: 'Android',
  //package: 'com.github.android_app_bootstrap',
  //activity: 'com.github.android_app_bootstrap.activity.WelcomeActivity',
  app:'http://pkg3.fir.im/beb1a34cd7142676e082977cfb654dc6d2e62935.apk'
  //app: path.join(__dirname, '..', 'app', `${platform}-huajiaovr.zip`)
};

if (process.env.UDID){
    androidOpts.udid=process.env.UDID;
    iOSOpts.udid=process.env.UDID;
};

var wd = require('webdriver-client')(_.merge({}, platform === 'ios' ? iOSOpts : androidOpts));

// override back for ios
wd.addPromiseChainMethod('customback', function() {
  if (platform === 'ios') {
    return this;
  }

  return this
    .back();
});

describe('开始测试',function(){
    this.timeout(5*60*1000);
    var driver=wd.initPromiseChain();

    before(function(){return driver.initDriver();
    });

    after(function(){return driver.sleep(1000).quit();
    });

    it('#1 find live room, enter room, look 60s',function(){
        return driver.waitForElementById('com.aurora3663.aurora:id/online','3000','100').tap().sleep(60000);
    });
    it('#2 quit room',function(){
        return driver.waitForElementById('com.aurora3663.aurora:id/activity_sendHeart_cancalbutton','3000','100').tap();
    });    
});
