# -*- coding: utf-8 -*-
__author__ = '刘少平'

TOP_LEVEL_BROWSER = []
ALIASES = []
TOP_LEVEL_OS = []


def is_user_agent_string(user_agent_str):
    if not user_agent_str:
        return False
    if not isinstance(user_agent_str, str):
        return False
    for aliase in ALIASES:
        return user_agent_str.lower().__contains__(aliase)
    return False


class Brower(object):
    def __init__(self, manufacturer, parent, version, name, aliases, exclude=None, browser_type=None,
                 rendering_engine=None, version_regex_string=None):
        super(object, self).__init__()
        self.manufacturer = manufacturer
        self.parent = parent
        self.children = []
        self.name = name
        self.version = version
        self.aliases = aliases
        if aliases:
            [ALIASES.append(a) for a in aliases]
        self.exclude_list = exclude
        self.browser_type = browser_type
        self.rendering_engine = rendering_engine
        if version_regex_string:
            self.version_regex_string = version_regex_string
        if not parent:
            TOP_LEVEL_BROWSER.append(self)
        else:
            self.parent.children.append(self)

    def check_user_agent(self, user_agent_str):
        if not user_agent_str:
            return None
        if self.children:
            for b in self.children:
                target = b.check_user_agent(user_agent_str)
                if target:
                    return target
        for aliase in self.aliases:
            if user_agent_str.lower().__contains__(aliase.lower()):
                return self
        return None

# Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36
Brower('GOOGLE', None, 39, 'Chrome 39', ['chrome/39'])
OUTLOOK = Brower('MICROSOFT', None, 100, 'Outlook', ['MSOffice'])
Brower('MICROSOFT', OUTLOOK, 107, 'Outlook 2007', ['MSOffice 12'])
Brower('MICROSOFT', OUTLOOK, 109, 'Outlook 2013', ['Microsoft Outlook 15'])
Brower('MICROSOFT', OUTLOOK, 108, 'Outlook 2010', ['MSOffice 14', 'Microsoft Outlook 14'])

IE = Brower('MICROSOFT', None, 1, 'Internet Explorer', ['MSIE', 'Trident', 'IE '])
Brower('MICROSOFT', IE, 110, 'Windows Live Mail', ['Outlook-Express/7.0'])
Brower('MICROSOFT', IE, 125, 'IE Mobile 11', ['IEMobile/11'])
Brower('MICROSOFT', IE, 124, 'IE Mobile 10', ['IEMobile/10'])
Brower('MICROSOFT', IE, 123, 'IE Mobile 9', ['IEMobile/9'])
Brower('MICROSOFT', IE, 121, 'IE Mobile 7', ['IEMobile/7'])
Brower('MICROSOFT', IE, 120, 'IE Mobile 6', ['IEMobile/6'])
Brower('MICROSOFT', IE, 95, 'Internet Explorer 11', ['Trident/7', 'IE 11.'])
Brower('MICROSOFT', IE, 92, 'Internet Explorer 10', ['MSIE 10'])
Brower('MICROSOFT', IE, 90, 'Internet Explorer 9', ['MSIE 9'])
Brower('MICROSOFT', IE, 80, 'Internet Explorer 8', ['MSIE 8'])
Brower('MICROSOFT', IE, 70, 'Internet Explorer 7', ['MSIE 7'])
Brower('MICROSOFT', IE, 60, 'Internet Explorer 6', ['MSIE 6'])
Brower('MICROSOFT', IE, 55, 'Internet Explorer 5.5', ['MSIE 5.5'])
Brower('MICROSOFT', IE, 50, 'Internet Explorer 5', ['MSIE 5'])

CHROME = Brower('GOOGLE', None, 1, 'Chrome', ['Chrome', 'CrMo', 'CriOS'])
Brower('GOOGLE', CHROME, 100, 'Chrome Mobile', ['CrMo', 'CriOs', 'Mobile Safari'])
Brower('GOOGLE', CHROME, 45, 'Chrome 40', ['Chrome/40'])
Brower('GOOGLE', CHROME, 45, 'Chrome 39', ['Chrome/39'])
Brower('GOOGLE', CHROME, 45, 'Chrome 38', ['Chrome/38'])
Brower('GOOGLE', CHROME, 45, 'Chrome 37', ['Chrome/37'])
Brower('GOOGLE', CHROME, 45, 'Chrome 36', ['Chrome/36'])
Brower('GOOGLE', CHROME, 45, 'Chrome 35', ['Chrome/35'])
Brower('GOOGLE', CHROME, 45, 'Chrome 34', ['Chrome/34'])
Brower('GOOGLE', CHROME, 45, 'Chrome 33', ['Chrome/33'])
Brower('GOOGLE', CHROME, 45, 'Chrome 32', ['Chrome/32'])
Brower('GOOGLE', CHROME, 45, 'Chrome 31', ['Chrome/31'])
Brower('GOOGLE', CHROME, 45, 'Chrome 30', ['Chrome/30'])
Brower('GOOGLE', CHROME, 45, 'Chrome 29', ['Chrome/29'])
Brower('GOOGLE', CHROME, 45, 'Chrome 28', ['Chrome/28'])
Brower('GOOGLE', CHROME, 45, 'Chrome 27', ['Chrome/27'])
Brower('GOOGLE', CHROME, 45, 'Chrome 26', ['Chrome/26'])
Brower('GOOGLE', CHROME, 45, 'Chrome 25', ['Chrome/25'])
Brower('GOOGLE', CHROME, 45, 'Chrome 24', ['Chrome/24'])
Brower('GOOGLE', CHROME, 45, 'Chrome 23', ['Chrome/23'])
Brower('GOOGLE', CHROME, 45, 'Chrome 22', ['Chrome/22'])
Brower('GOOGLE', CHROME, 45, 'Chrome 21', ['Chrome/21'])
Brower('GOOGLE', CHROME, 45, 'Chrome 20', ['Chrome/20'])
Brower('GOOGLE', CHROME, 45, 'Chrome 19', ['Chrome/19'])
Brower('GOOGLE', CHROME, 45, 'Chrome 18', ['Chrome/18'])
Brower('GOOGLE', CHROME, 45, 'Chrome 17', ['Chrome/17'])
Brower('GOOGLE', CHROME, 45, 'Chrome 16', ['Chrome/16'])
Brower('GOOGLE', CHROME, 45, 'Chrome 15', ['Chrome/15'])
Brower('GOOGLE', CHROME, 45, 'Chrome 14', ['Chrome/14'])
Brower('GOOGLE', CHROME, 45, 'Chrome 13', ['Chrome/13'])
Brower('GOOGLE', CHROME, 45, 'Chrome 12', ['Chrome/12'])
Brower('GOOGLE', CHROME, 45, 'Chrome 11', ['Chrome/11'])
Brower('GOOGLE', CHROME, 45, 'Chrome 10', ['Chrome/10'])
Brower('GOOGLE', CHROME, 45, 'Chrome 9', ['Chrome/9'])
Brower('GOOGLE', CHROME, 45, 'Chrome 8', ['Chrome/8'])

Brower('OTHER', None, 45, 'OmniWeb', ['OmniWeb'])

SAFARI = Brower('APPLE', None, 1, 'Safari', ['Safari'])
Brower('BLACKBERRY', SAFARI, 10, 'BlackBerry', ['BB10'])
Brower('APPLE', SAFARI, 2, 'Mobile Safari', ['Mobile Safari', 'Mobile/'])
Brower('AMAZON', SAFARI, 2, 'Silk', ['Silk/'])
Brower('APPLE', SAFARI, 2, 'Safari 8', ['Version/8'])
Brower('APPLE', SAFARI, 2, 'Safari 7', ['Version/7'])
Brower('APPLE', SAFARI, 2, 'Safari 6', ['Version/6'])
Brower('APPLE', SAFARI, 2, 'Safari 5', ['Version/5'])
Brower('APPLE', SAFARI, 2, 'Safari 4', ['Version/4'])

COAST = Brower('OPERA', None, 1, 'Opera', ['Coast/'])
Brower('OPERA', COAST, 2, 'Opera', ['Coast/1.|'])

OPERA = Brower('OPERA', None, 1, 'Opera', [' OPR/', 'Opera'])
Brower('Opera', OPERA, 2, 'Opera Mini', ['Opera Mini'])
Brower('Opera', OPERA, 2, 'Opera 25', ['OPR/25.'])
Brower('Opera', OPERA, 2, 'Opera 24', ['OPR/24.'])
Brower('Opera', OPERA, 2, 'Opera 23', ['OPR/23.'])
Brower('Opera', OPERA, 2, 'Opera 20', ['OPR/20.'])
Brower('Opera', OPERA, 2, 'Opera 19', ['OPR/19.'])
Brower('Opera', OPERA, 2, 'Opera 18', ['OPR/18.'])
Brower('Opera', OPERA, 2, 'Opera 17', ['OPR/17.'])
Brower('Opera', OPERA, 2, 'Opera 16', ['OPR/16.'])
Brower('Opera', OPERA, 2, 'Opera 15', ['OPR/15.'])
Brower('Opera', OPERA, 2, 'Opera 12', ['OPR/12'])
Brower('Opera', OPERA, 2, 'Opera 11', ['OPR/11.'])
Brower('Opera', OPERA, 2, 'Opera 10', ['OPR/9.8'])
Brower('Opera', OPERA, 2, 'Opera 9', ['OPR/9'])

Brower('OPTHER', None, 1, 'Konqueror', ['Konqueror'])
Brower('SAMSUNG', None, 1, 'Samsung Dolphin 2', ['Dolfin/2'])

APPLE_WEB_KIT = Brower('APPLE', None, 1, 'Apple Webkit', ['AppleWebKit'])
Brower('APPLE', APPLE_WEB_KIT, 2, 'iTunes', 'iTunes')
Brower('APPLE', APPLE_WEB_KIT, 3, 'APP Store', ['MacAppStore'])
Brower('ADOBE', APPLE_WEB_KIT, 4, 'Adobe AIR application', ['AdobeAIR'])

Brower('OTHER', None, 3, 'Lotus Notes', ['Lotus-Notes'])

CAMINO = Brower('OTHER', None, 1, 'Camino', ['Camino'])
Brower('OTHER', CAMINO, 2, 'Camino 2', ['Camino/2'])

Brower('OTHER', None, 1, 'Flock', ['Flock'])

FIREFOX = Brower('MOZILLA', None, 1, 'Firefox', ['Firefox'])
Brower('MOZILLA', FIREFOX, 2, 'Firefox 3 Mobile', ['Firefox/3.5 Maemo'])
Brower('MOZILLA', FIREFOX, 2, 'Firefox Mobile', ['Mobile'])
Brower('MOZILLA', FIREFOX, 2, 'Firefox Mobile 23', ['Firefox/23'])
Brower('MOZILLA', FIREFOX, 2, 'Firefox 40', ['Firefox/40'])
Brower('MOZILLA', FIREFOX, 2, 'Firefox 39', ['Firefox/39'])
Brower('MOZILLA', FIREFOX, 2, 'Firefox 38', ['Firefox/38'])
Brower('MOZILLA', FIREFOX, 2, 'Firefox 37', ['Firefox/37'])
Brower('MOZILLA', FIREFOX, 2, 'Firefox 36', ['Firefox/36'])
Brower('MOZILLA', FIREFOX, 2, 'Firefox 35', ['Firefox/37'])
Brower('MOZILLA', FIREFOX, 2, 'Firefox 34', ['Firefox/34'])
Brower('MOZILLA', FIREFOX, 2, 'Firefox 33', ['Firefox/33'])
Brower('MOZILLA', FIREFOX, 2, 'Firefox 32', ['Firefox/32'])
Brower('MOZILLA', FIREFOX, 2, 'Firefox 31', ['Firefox/31'])
Brower('MOZILLA', FIREFOX, 2, 'Firefox 30', ['Firefox/30'])
Brower('MOZILLA', FIREFOX, 2, 'Firefox 29', ['Firefox/29'])
Brower('MOZILLA', FIREFOX, 2, 'Firefox 28', ['Firefox/28'])
Brower('MOZILLA', FIREFOX, 2, 'Firefox 27', ['Firefox/27'])
Brower('MOZILLA', FIREFOX, 2, 'Firefox 26', ['Firefox/26'])
Brower('MOZILLA', FIREFOX, 2, 'Firefox 25', ['Firefox/25'])
Brower('MOZILLA', FIREFOX, 2, 'Firefox 24', ['Firefox/24'])
Brower('MOZILLA', FIREFOX, 2, 'Firefox 23', ['Firefox/23'])
Brower('MOZILLA', FIREFOX, 2, 'Firefox 22', ['Firefox/22'])
Brower('MOZILLA', FIREFOX, 2, 'Firefox 21', ['Firefox/21'])
Brower('MOZILLA', FIREFOX, 2, 'Firefox 20', ['Firefox/20'])
Brower('MOZILLA', FIREFOX, 2, 'Firefox 19', ['Firefox/19'])
Brower('MOZILLA', FIREFOX, 2, 'Firefox 18', ['Firefox/18'])
Brower('MOZILLA', FIREFOX, 2, 'Firefox 17', ['Firefox/17'])
Brower('MOZILLA', FIREFOX, 2, 'Firefox 16', ['Firefox/16'])
Brower('MOZILLA', FIREFOX, 2, 'Firefox 15', ['Firefox/15'])
Brower('MOZILLA', FIREFOX, 2, 'Firefox 14', ['Firefox/14'])
Brower('MOZILLA', FIREFOX, 2, 'Firefox 13', ['Firefox/13'])
Brower('MOZILLA', FIREFOX, 2, 'Firefox 12', ['Firefox/12'])
Brower('MOZILLA', FIREFOX, 2, 'Firefox 11', ['Firefox/11'])
Brower('MOZILLA', FIREFOX, 2, 'Firefox 10', ['Firefox/10'])
Brower('MOZILLA', FIREFOX, 2, 'Firefox 9', ['Firefox/9'])
Brower('MOZILLA', FIREFOX, 2, 'Firefox 8', ['Firefox/8'])
Brower('MOZILLA', FIREFOX, 2, 'Firefox 7', ['Firefox/7'])
Brower('MOZILLA', FIREFOX, 2, 'Firefox 6', ['Firefox/6'])
Brower('MOZILLA', FIREFOX, 2, 'Firefox 5', ['Firefox/5'])
Brower('MOZILLA', FIREFOX, 2, 'Firefox 4', ['Firefox/4'])
Brower('MOZILLA', FIREFOX, 2, 'Firefox 3', ['Firefox/3'])
Brower('MOZILLA', FIREFOX, 2, 'Firefox 2', ['Firefox/2'])
Brower('MOZILLA', FIREFOX, 2, 'Firefox 1.5', ['Firefox/1.5'])

THUNDERBIRD = Brower('MOZILLA', None, 1, 'Thunderbird', ['Thunderbird'])
Brower('MOZILLA', THUNDERBIRD, 2, 'Thunderbird 12', ['Thunderbird/12'])
Brower('MOZILLA', THUNDERBIRD, 2, 'Thunderbird 11', ['Thunderbird/11'])
Brower('MOZILLA', THUNDERBIRD, 2, 'Thunderbird 10', ['Thunderbird/10'])
Brower('MOZILLA', THUNDERBIRD, 2, 'Thunderbird 8', ['Thunderbird/8'])
Brower('MOZILLA', THUNDERBIRD, 2, 'Thunderbird 7', ['Thunderbird/7'])
Brower('MOZILLA', THUNDERBIRD, 2, 'Thunderbird 6', ['Thunderbird/6'])
Brower('MOZILLA', THUNDERBIRD, 2, 'Thunderbird 3', ['Thunderbird/3'])
Brower('MOZILLA', THUNDERBIRD, 2, 'Thunderbird 2', ['Thunderbird/2'])

Brower('OTHER', None, 1, 'SeaMonkey', ['SeaMonkey'])
DOT = Brower('OTHER', None, 1, 'Robot/Spider',
             ['Googlebot', "Web Preview", "bot", "spider", "crawler", "Feedfetcher", "Slurp", "Twiceler", "Nutch",
              "BecomeBot"])
Brower('OTHER', DOT, 1, 'Mobil Robot/Spider', ['Googlebot-Mobile'])
Brower('OTHER', None, 1, 'Mozilla', ["Mozilla", "Moozilla"])
Brower('OTHER', None, 1, 'CFNetwork', ['CFNetwork'])
Brower('OTHER', None, 1, 'Eudora', ["Eudora", "EUDORA"])
Brower('OTHER', None, 1, 'PocoMail', ['PocoMail'])
Brower('OTHER', None, 1, 'The Bat', ['The Bat'])
Brower('OTHER', None, 1, 'NetFront', ['NetFront'])
Brower('OTHER', None, 1, 'Evolution', ['CamelHttpStream'])
Brower('OTHER', None, 1, 'Lynx', ['Lynx'])
Brower('OTHER', None, 1, 'Downloading Tool', ["cURL", "wget", "ggpht.com", "Apache-HttpClient"])


class OS(object):
    def __init__(self, manufacturer, parent, name, aliases):
        super(object, self).__init__()
        self.manufacturer = manufacturer
        self.parent = parent
        self.children = []
        self.name = name
        self.aliases = aliases
        if not parent:
            TOP_LEVEL_OS.append(self)
        else:
            self.parent.children.append(self)

    def check_user_agent(self, user_agent_str):
        if not user_agent_str:
            return None
        if not isinstance(user_agent_str, str):
            return None
        if self.children:
            for child in self.children:
                target = child.check_user_agent(user_agent_str)
                if target:
                    return target
        for aliase in self.aliases:
            if user_agent_str.lower().__contains__(aliase.lower()):
                return self
        return None


WINDOWS = OS('MOCROSOFT', None, 'Windows', ['Windows'])
OS('MICROSOFT', WINDOWS, 'Windows 10', ['Windows NT 6.4'])
OS('MICROSOFT', WINDOWS, 'Windows 8.1', ['Windows NT 6.3'])
OS('MICROSOFT', WINDOWS, 'Windows 8', ['Windows NT 6.2'])
OS('MICROSOFT', WINDOWS, 'Windows 7', ['Windows NT 6.1'])
OS('MICROSOFT', WINDOWS, 'Windows Vista', ['Windows NT 6'])
OS('MICROSOFT', WINDOWS, 'Windows 2000', ['Windows NT 5.0'])
OS('MICROSOFT', WINDOWS, 'Windows XP', ['Windows NT 5'])
OS('MICROSOFT', WINDOWS, 'Windows Phone 8.1', ['Windows Phone 8.1'])
OS('MICROSOFT', WINDOWS, 'Windows Phone 8', ['Windows Phone 8'])
OS('MICROSOFT', WINDOWS, 'Windows Phone 7', ['Windows Phone OS 7'])
OS('MICROSOFT', WINDOWS, 'Windows Mobile', ['Windows CE'])
OS('MICROSOFT', WINDOWS, 'Windows 98', ['Windows 98', 'Win98'])

ANDROID = OS('GOOGLE', None, 'Android', ['Android'])
OS('GOOGLE', ANDROID, 'Android 5.x', ['Android 5', 'Android-5'])
OS('GOOGLE', ANDROID, 'Android 5.x Tablet', ['Android 5', 'Android-5'])
OS('GOOGLE', ANDROID, 'Android 4.x', ['Android 4', 'Android-4'])
OS('GOOGLE', ANDROID, 'Android 4.x Tablet', ['Android 4', 'Android-4'])
OS('GOOGLE', ANDROID, 'Android 3.x Tablet', ['Android 3'])
OS('GOOGLE', ANDROID, 'Android 2.x', ['Android 2'])
OS('GOOGLE', ANDROID, 'Android 2.x Tablet', ["Kindle Fire", "GT-P1000", "SCH-I800"])
OS('GOOGLE', ANDROID, 'Android 1.x', ['Android 1'])
OS('GOOGLE', ANDROID, 'Android Mobile', ['Mobile'])
OS('GOOGLE', ANDROID, 'Android Tablet', ['Tablet'])

OS('GOOGLE', None, 'Chrome OS', 'CrOS')

OS('HP', None, 'WebOS', ['webOS'])
OS('HP', None, 'PalmOS', ['Palm'])
OS('NOKIA', None, 'MeeGo', ['MeeGo'])

IOS = OS('APPLE', None, 'IOS', ['iPhone OS', 'like Mac OS X'])
OS('APPLE', IOS, 'IOS 8.1 (iPhone)', ['iPhone OS 8_1'])
OS('APPLE', IOS, 'IOS 8 (iPhone)', ['iPhone OS 8_0'])
OS('APPLE', IOS, 'IOS 7 (iPhone)', ['iPhone OS 7'])
OS('APPLE', IOS, 'IOS 6 (iPhone)', ['iPhone OS 6'])
OS('APPLE', IOS, 'IOS 5 (iPhone)', ['iPhone OS 5'])
OS('APPLE', IOS, 'IOS 4 (iPhone)', ['iPhone OS 4'])
OS('APPLE', IOS, 'Mac OS X (iPad)', ['iPad'])
OS('APPLE', IOS, 'iOS 8.1 (iPad)', ['OS 8_1'])
OS('APPLE', IOS, 'iOS 8 (iPad)', ['OS 8_0'])
OS('APPLE', IOS, 'iOS 7 (iPad)', ['OS 7'])
OS('APPLE', IOS, 'iOS 6 (iPad)', ['OS 6'])
OS('APPLE', IOS, 'Mac OS X 9iPhone0', ['iPhone'])
OS('APPLE', IOS, 'Mac OS X (iPod)', ['iPod'])

OS('APPLE', None, 'Mac OS X', ['Mac OS X', 'CFNetwork'])
OS('APPLE', None, 'Mac OS', ['Mac'])
OS('NOKIA', None, 'Maemo', ['Maemo'])
OS('SAMSUNG', None, 'Bada', ['Bada'])
OS('GOOGLE', None, 'Android (Google TV)', ['GoogleTV'])

KINDLE = OS('AMAZON', None, 'Linux (Kindle)', ['Kindle'])
OS('AMAZON', KINDLE, 'Linux (Kindle 3)', ['Kindle/3'])
OS('AMAZON', KINDLE, 'Linux (Kindle 2)', ['Kindle/2'])

OS('OTHER', None, 'Linux', ['Linux', 'CamelHttpStream'])

SYMBIAN = OS('SYMBIAN', None, 'Symbian OS', ['Symbian', 'Series60'])
OS('SYMBIAN', SYMBIAN, 'Symbian OS 9.x', ['SymbianOS/9', 'Series60/3'])
OS('SYMBIAN', SYMBIAN, 'Symbian OS 8.x', ['SymbianOS/8', 'Series60/2.6', 'Series60/2.8'])
OS('SYMBIAN', SYMBIAN, 'Symbian OS 7.x', ['SymbianOS/7'])
OS('SYMBIAN', SYMBIAN, 'Symbian OS 6.x', ['SymbianOS/6'])

OS('NOKIA', None, 'Series 40', ['Nokia6300'])
OS('SONY_EROCSSON', None, 'Sony Ericsson', ['SonyEricsson'])
OS('SUN', None, 'SunOS', ['SunOS'])
OS('SONY', None, 'Sony Playstation', ['Platstation'])
OS('NINTENDO', None, 'Nintendo Wii', ['Wii'])
BLACKBERRYOS = OS('BLACKBERRY', None, 'BlackBerryOS', ['BlackBerry'])
OS('BLACKBERRY', BLACKBERRYOS, 'BlackBerry 7', ['version/7'])
OS('BLACKBERRY', BLACKBERRYOS, 'BlackBerry 6', ['version/6'])

OS('BLACKBERRY', None, 'BlackBerry Tablet OS', ['RIM Tablet OS'])
OS('ROKU', None, 'Roku OS', ['Roku'])
OS('OTHER', None, 'Proxy', ['ggpht.com'])
OS('OTHER', None, 'unknown mobile', ['Mobile'])
OS('OTHER', None, 'unknown tablet', ['Tablet'])


def check_browser(user_agent_str):
    if not is_user_agent_string(user_agent_str):
        return None
    for b in TOP_LEVEL_BROWSER:
        target = b.check_user_agent(user_agent_str)
        if target:
            return target
    return None


def check_os(user_agent_str):
    if not is_user_agent_string(user_agent_str):
        return None
    for o in TOP_LEVEL_OS:
        target = o.check_user_agent(user_agent_str)
        if target:
            return target
    return None


def check_user_agent(user_agent_str):
    return ( check_os(user_agent_str), check_browser(user_agent_str) )


if __name__ == '__main__':
    user_agent_str = 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36'
    print(user_agent_str, ' is a valid user agent string ? ', is_user_agent_string(user_agent_str))
    user_agent = check_user_agent(user_agent_str)
    print('browser: ', user_agent)
    print(user_agent[0].name, user_agent[1].name)
