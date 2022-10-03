const zhNum = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"];

const unit = ["", "十", "百", "千"];

const sections = ["", "万", "亿", "万亿", "亿亿"];

function SectionToChinese(section) {
  var strIns = "",
    chnStr = "";
  // 节内下标
  var unitPos = 0;
  // 在节内后面数组的零，或者连续的多个零可以省去
  var zero = true;
  while (section > 0) {
    // 从后往前遍历
    var v = section % 10;
    if (v === 0) {
      if (!zero) {
        zero = true;
        chnStr = zhNum[v] + chnStr;
      }
    } else {
      zero = false;
      strIns = zhNum[v];
      strIns += unit[unitPos];
      // 从后往前相加
      chnStr = strIns + chnStr;
    }
    unitPos++;
    section = Math.floor(section / 10);
  }
  return chnStr;
}

function NumberToChinese(num) {
  // 节下标
  var unitPos = 0;
  var strIns = "",
    chnStr = "";
  var needZero = false;

  if (num === 0) {
    return zhNum[0];
  }

  while (num > 0) {
    var section = num % 10000;
    if (needZero) {
      // 如果前一个节数据小于1000，在其前面加上零
      chnStr = zhNum[0] + chnStr;
    }
    strIns = SectionToChinese(section);
    strIns += section !== 0 ? sections[unitPos] : sections[0];
    chnStr = strIns + chnStr;
    // 记录当前节数据是否小于1000
    needZero = section < 1000 && section > 0;
    num = Math.floor(num / 10000);
    unitPos++;
  }

  return chnStr;
}


console.log(NumberToChinese('12340210'));
