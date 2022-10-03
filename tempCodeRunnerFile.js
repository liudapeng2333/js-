
function SectionToChinese(section){
  var strIns = '', chnStr = '';
  var unitPos = 0;
  var zero = true;
  while(section > 0){
      var v = section % 10;
      if(v === 0){
          if(!zero){
              zero = true;
              chnStr = chnNumChar[v] + chnStr;
          }
      }else{
          zero = false;
          strIns = chnNumChar[v];
          strIns += chnUnitChar[unitPos];
          chnStr = strIns + chnStr;
      }
      unitPos++;
      section = Math.floor(section / 10);
  }
  return chnStr;
}

console.log(SectionToChinese("3020000"));