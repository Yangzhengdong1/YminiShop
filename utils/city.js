/**
 * getChina
 * 根据省市的拼音获取对应的中文
 */
var province = [{ name: "beijing", cities: ["xicheng", "dongcheng", "chongwen", "xuanwu", "chaoyang", "haidian", "fengtai", "shijingshan", "mentougou", "fangshan", "tongzhou", "shunyi", "daxing", "changping", "pinggu", "huairou", "miyun", "yanqing"] },
{ name: "tianjin", cities: ["qingyang", "hedong", "hexi", "nankai", "hebei", "hongqiao", "tanggu", "hangu", "dagang", "dongli", "xiqing", "beichen", "jinnan", "wuqing", "baodi", "jinghai", "ninghe", "jixian", "kaifaqu"] },
{ name: "hebei", cities: ["shijiazhuang", "qinhuangdao", "langfang", "baoding", "handan", "tangshan", "xingtai", "hengshui", "zhangjiakou", "chengde", "cangzhou", "hengshui"] },
{ name: "shanxi", cities: ["taiyuan", "datong", "changzhi", "jinzhong", "yangquan", "shuozhou", "yuncheng", "linfen"] },
{ name: "namenggu", cities: ["huhehaote", "chifeng", "tongliao", "xilinguole", "xingan"] },
{ name: "liaoning", cities: ["dalian", "shenyang", "anshan", "fushun", "yingkou", "jinzhou", "dandong", "chaoyang", "liaoyang", "fuxin", "tieling", "panjin", "benxi", "huludao"] },
{ name: "jilin", cities: ["changchun", "jilin", "siping", "liaoyuan", "tonghua", "yanji", "baicheng", "liaoyuan", "songyuan", "linjiang", "huichun"] },
{ name: "heilongjiang", cities: ["haerbin", "qiqihaer", "daqing", "mudanjiang", "hegang", "jiamusi", "suihua"] },
{ name: "shanghai", cities: ["pudong", "yangpu", "xuhui", "jingan", "luwan", "huangpu", "putuo", "zhabei", "hongkou", "changning", "baoshan", "minxing", "jiading", "jinshan", "songjiang", "qingpu", "chongming", "fengxian", "nanhui"] },
{ name: "jiangsu", cities: ["nanjing", "suzhou", "wuxi", "changzhou", "yangzhou", "xuzhou", "nantong", "zhenjiang", "taizhou", "huaian", "lianyungang", "suqian", "yancheng", "huaiyin", "muyang", "zhangjiagang"] },
{ name: "zhejiang", cities: ["hangzhou", "jinhua", "ningbo", "wenzhou", "jiaxing", "shaoxing", "lishui", "huzhou", "taizhou", "zhoushan", "quzhou"] },
{ name: "anhui", cities: ["hefei", "maanshan", "bangbu", "huangshan", "wuhu", "huainan", "tongling", "fuyang", "xuancheng", "anqing"] },
{ name: "fujian", cities: ["fuzhou", "xiamen", "quanzhou", "zhangzhou", "nanping", "longyan", "putian", "sanming", "ningde"] },
{ name: "jiangxi", cities: ["nanchang", "jingdezhen", "shangrao", "pingxiang", "jiujiang", "jian", "yichun", "yingtan", "xinyu", "ganzhou"] },
{ name: "shandong", cities: ["qingdao", "jinan", "zibo", "yantai", "taian", "linyi", "rizhao", "dezhou", "weihai", "dongying", "heze", "jining", "weifang", "zaozhuang", "liaocheng"] },
{ name: "henan", cities: ["zhengzhou", "luoyang", "kaifeng", "pingdingshan", "puyang", "anyang", "xuchang", "nanyang", "xinyang", "zhoukou", "xinxiang", "jiaozuo", "sanmenxia", "shangqiu"] },
{ name: "hubei", cities: ["wuhan", "xiangfan", "xiaogan", "shiyan", "jingzhou", "huangshi", "yichang", "huanggang", "enshi", "ezhou", "jianghan", "suizao", "jingsha", "xianning"] },
{ name: "hunan", cities: ["changsha", "xiangtan", "yueyang", "zhuzhou", "huaihua", "yongzhou", "yiyang", "zhangjiajie", "changde", "hengyang", "xiangxi", "shaoyang", "loudi", "chenzhou"] },
{ name: "guangdong", cities: ["guangzhou", "shenzhen", "dongwan", "foshan", "zhuhai", "shantou", "shaoguan", "jiangmen", "meizhou", "jieyang", "zhongshan", "heyuan", "huizhou", "maoming", "zhanjiang", "yangjiang", "chaozhou", "yunfu", "shanwei", "chaoyang", "zhaoqing", "shunde", "qingyuan"] },
{ name: "guangxi", cities: ["nanning", "guilin", "liuzhou", "wuzhou", "laibin", "guigang", "yulin", "hezhou"] },
{ name: "hainan", cities: ["haikou", "sanya"] },
{ name: "zhongqing", cities: ["yuzhong", "dadukou", "jiangbei", "shapingba", "jiulongpo", "nanan", "beibei", "wansheng", "shuangqiao", "yubei", "banan", "wanzhou", "fuling", "qianjiang", "changshou"] },
{ name: "sichuan", cities: ["chengdou", "dazhou", "nanchong", "leshan", "mianyang", "deyang", "najiang", "suining", "yibin", "bazhong", "zigong", "kangding", "panzhihua"] },
{ name: "guizhou", cities: ["guiyang", "zunyi", "anshun", "qianxinan", "douyun"] },
{ name: "yunnan", cities: ["kunming", "lijiang", "zhaotong", "yuxi", "lincang", "wenshan", "honghe", "chuxiong", "dali"] },
{ name: "xicang", cities: ["lasa", "linzhi", "rikaze", "changdou"] },
{ name: "shanxi", cities: ["xian", "xianyang", "yanan", "hanzhong", "yulin", "shangnan", "lueyang", "yijun", "linyou", "baihe"] },
{ name: "gansu", cities: ["lanzhou", "jinchang", "tianshui", "wuwei", "zhangye", "pingliang", "jiuquan"] },
{ name: "qinghai", cities: ["huangnan", "hainan", "xining", "haidong", "haixi", "haibei", "guoluo", "yushu"] },
{ name: "ningxia", cities: ["yinchuan", "wuzhong"] },
{ name: "xinjiang", cities: ["wulumuqi", "hami", "kashi", "bayinguoleng", "changji", "yili", "aletai", "kelamayi", "boertala"] },
{ name: "xianggang", cities: ["zhongxiqu", "wanziqu", "dongqu", "nanqu", "jiulong-youjianwangqu", "jiulong-shenshuibuqu", "jiulong-jiulongchengqu", "jiulong-huangdaxianqu", "jiulong-guantangqu", "xinjie-beiqu", "xinjie-dapuqu", "xinjie-shatianqu", "xinjie-xigongqu", "xinjie-quanwanqu", "xinjie-tunmenqu", "xinjie-yuanlangqu", "xinjie-kuiqingqu", "xinjie-lidaoqu"] },
{ name: "aomen", cities: ["huadimatangqu", "shenganduonitangqu", "datangqu", "wangdetangqu", "fengshuntangqu", "jiamotangqu", "shengfangjigetangqu", "ludangcheng"] }];

var province2 = [{ name: "北京", cities: ["西城", "东城", "崇文", "宣武", "朝阳", "海淀", "丰台", "石景山", "门头沟", "房山", "通州", "顺义", "大兴", "昌平", "平谷", "怀柔", "密云", "延庆"] },
{ name: "天津", cities: ["青羊", "河东", "河西", "南开", "河北", "红桥", "塘沽", "汉沽", "大港", "东丽", "西青", "北辰", "津南", "武清", "宝坻", "静海", "宁河", "蓟县", "开发区"] },
{ name: "河北", cities: ["石家庄", "秦皇岛", "廊坊", "保定", "邯郸", "唐山", "邢台", "衡水", "张家口", "承德", "沧州", "衡水"] },
{ name: "山西", cities: ["太原", "大同", "长治", "晋中", "阳泉", "朔州", "运城", "临汾"] },
{ name: "内蒙古", cities: ["呼和浩特", "赤峰", "通辽", "锡林郭勒", "兴安"] },
{ name: "辽宁", cities: ["大连", "沈阳", "鞍山", "抚顺", "营口", "锦州", "丹东", "朝阳", "辽阳", "阜新", "铁岭", "盘锦", "本溪", "葫芦岛"] },
{ name: "吉林", cities: ["长春", "吉林", "四平", "辽源", "通化", "延吉", "白城", "辽源", "松原", "临江", "珲春"] },
{ name: "黑龙江", cities: ["哈尔滨", "齐齐哈尔", "大庆", "牡丹江", "鹤岗", "佳木斯", "绥化"] },
{ name: "上海", cities: ["浦东", "杨浦", "徐汇", "静安", "卢湾", "黄浦", "普陀", "闸北", "虹口", "长宁", "宝山", "闵行", "嘉定", "金山", "松江", "青浦", "崇明", "奉贤", "南汇"] },
{ name: "江苏", cities: ["南京", "苏州", "无锡", "常州", "扬州", "徐州", "南通", "镇江", "泰州", "淮安", "连云港", "宿迁", "盐城", "淮阴", "沐阳", "张家港"] },
{ name: "浙江", cities: ["杭州", "金华", "宁波", "温州", "嘉兴", "绍兴", "丽水", "湖州", "台州", "舟山", "衢州"] },
{ name: "安徽", cities: ["合肥", "马鞍山", "蚌埠", "黄山", "芜湖", "淮南", "铜陵", "阜阳", "宣城", "安庆"] },
{ name: "福建", cities: ["福州", "厦门", "泉州", "漳州", "南平", "龙岩", "莆田", "三明", "宁德"] },
{ name: "江西", cities: ["南昌", "景德镇", "上饶", "萍乡", "九江", "吉安", "宜春", "鹰潭", "新余", "赣州"] },
{ name: "山东", cities: ["青岛", "济南", "淄博", "烟台", "泰安", "临沂", "日照", "德州", "威海", "东营", "荷泽", "济宁", "潍坊", "枣庄", "聊城"] },
{ name: "河南", cities: ["郑州", "洛阳", "开封", "平顶山", "濮阳", "安阳", "许昌", "南阳", "信阳", "周口", "新乡", "焦作", "三门峡", "商丘"] },
{ name: "湖北", cities: ["武汉", "襄樊", "孝感", "十堰", "荆州", "黄石", "宜昌", "黄冈", "恩施", "鄂州", "江汉", "随枣", "荆沙", "咸宁"] },
{ name: "湖南", cities: ["长沙", "湘潭", "岳阳", "株洲", "怀化", "永州", "益阳", "张家界", "常德", "衡阳", "湘西", "邵阳", "娄底", "郴州"] },
{ name: "广东", cities: ["广州", "深圳", "东莞", "佛山", "珠海", "汕头", "韶关", "江门", "梅州", "揭阳", "中山", "河源", "惠州", "茂名", "湛江", "阳江", "潮州", "云浮", "汕尾", "潮阳", "肇庆", "顺德", "清远"] },
{ name: "广西", cities: ["南宁", "桂林", "柳州", "梧州", "来宾", "贵港", "玉林", "贺州"] },
{ name: "海南", cities: ["海口", "三亚"] },
{ name: "重庆", cities: ["渝中", "大渡口", "江北", "沙坪坝", "九龙坡", "南岸", "北碚", "万盛", "双桥", "渝北", "巴南", "万州", "涪陵", "黔江", "长寿"] },
{ name: "四川", cities: ["成都", "达州", "南充", "乐山", "绵阳", "德阳", "内江", "遂宁", "宜宾", "巴中", "自贡", "康定", "攀枝花"] },
{ name: "贵州", cities: ["贵阳", "遵义", "安顺", "黔西南", "都匀"] },
{ name: "云南", cities: ["昆明", "丽江", "昭通", "玉溪", "临沧", "文山", "红河", "楚雄", "大理"] },
{ name: "西藏", cities: ["拉萨", "林芝", "日喀则", "昌都"] },
{ name: "陕西", cities: ["西安", "咸阳", "延安", "汉中", "榆林", "商南", "略阳", "宜君", "麟游", "白河"] },
{ name: "甘肃", cities: ["兰州", "金昌", "天水", "武威", "张掖", "平凉", "酒泉"] },
{ name: "青海", cities: ["黄南", "海南", "西宁", "海东", "海西", "海北", "果洛", "玉树"] },
{ name: "宁夏", cities: ["银川", "吴忠"] },
{ name: "新疆", cities: ["乌鲁木齐", "哈密", "喀什", "巴音郭楞", "昌吉", "伊犁", "阿勒泰", "克拉玛依", "博尔塔拉"] },
{ name: "香港", cities: ["中西区", "湾仔区", "东区", "南区", "九龙-油尖旺区", "九龙-深水埗区", "九龙-九龙城区", "九龙-黄大仙区", "九龙-观塘区", "新界-北区", "新界-大埔区", "新界-沙田区", "新界-西贡区", "新界-荃湾区", "新界-屯门区", "新界-元朗区", "新界-葵青区", "新界-离岛区"] },
{ name: "澳门", cities: ["花地玛堂区", "圣安多尼堂区", "大堂区", "望德堂区", "风顺堂区", "嘉模堂区", "圣方济各堂区", "路氹城"] }];

var getChina = strs => {
  const str = strs.toLowerCase();
  for (var i = 0; i < province.length; i++) {
    if (str == province[i].name) {
      return province2[i].name;
      // break;
    }
    for (var u = 0; u < province[i].cities.length; u++) {
      if (str == province[i].cities[u]) {
        return province2[i].cities[u];
        // break;
      }
    }
  }
  return '火星人';
}

module.exports = {
  getChina
}
