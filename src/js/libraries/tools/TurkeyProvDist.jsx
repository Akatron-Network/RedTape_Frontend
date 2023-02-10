import {turkey} from './turkey'

export default class TurkeyProvDist {
  constructor() {
    this.turkey = turkey
  }

  //- Turkey JSON Example
  //, "il": "Adana",
  //, "plaka": 1,
  //, "ilceleri": [
  //,   "Aladağ",
  //,   "Ceyhan",
  //,   "Çukurova",
  //,   "Feke",
  //,   "İmamoğlu",
  //,   "Karaisalı",
  //,   "Karataş",
  //,   "Kozan",
  //,   "Pozantı",
  //,   "Saimbeyli",
  //,   "Sarıçam",
  //,   "Seyhan",
  //,   "Tufanbeyli",
  //,   "Yumurtalık",
  //,   "Yüreğir"
  //, ]

  //f Get Turkey province list
  getProvinceList () {
    return this.turkey.map(p => p.il)
    
    let obj = new TurkeyProvDist(pList.sort(function(a, b){return a.localeCompare(b)}))
  }

  //f Get Turkey district list
  getDistrictList (province) {
    return this.turkey.filter(p => p.il === province)[0].ilceleri //. District filter according to province
  }
}