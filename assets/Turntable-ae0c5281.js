import{_ as h,o as d,c,b as o,W as m,n as i,F as g,j as w,t as u}from"./app-037f133e.js";const x={data(){return{width:500,isTake:!1,prizeAngle:0,prizeList:[{index:1,name:"一等奖",color:"red"},{index:2,name:"二等奖",color:"red"},{index:3,name:"三等奖",color:"red"},{index:4,name:"四等奖",color:"red"},{index:5,name:"五等奖",color:"red"},{index:6,name:"六等奖",color:"red"},{index:7,name:"谢谢惠顾",color:"red"},{index:8,name:"再来一次",color:"red"}],prizeName:null,style:{}}},mounted(){},methods:{calculationAngle(r,l){const a=this.prizeList.length;let p=360%a,e=360;p!==0&&(e=e-p);let t=e/a,s=t*r-t/2,n=90-t;return r===a-1&&(n-=p),l?n:s},luckDraw(){const r=Math.abs(Math.round(Math.random()*this.prizeList.length-1)),l=parseInt(360/this.prizeList.length);this.prizeAngle=`rotate(${3600+360-(this.calculationAngle(r)+l/2)}deg)`,this.prizeName=this.prizeList[r].name,this.isTake=!0,setTimeout(()=>{this.isTake=!1},1e4)}}},_={ref:"container"},z={key:1,class:"prizeName"};function f(r,l,a,p,e,t){return d(),c("div",{class:"index",style:i({"--prizeAngle":e.prizeAngle})},[o("div",_,null,512),o("div",{style:i({width:e.width+2+"px",position:"relative",margin:"auto",overflow:"hidden"})},[o("div",{class:m(e.isTake?"disc move":"disc"),style:i({width:e.width+"px",height:`${e.width}px`,"border-radius":`${e.width}px`,transform:e.prizeAngle})},[(d(!0),c(g,null,w(e.prizeList,(s,n)=>(d(),c("div",{key:s.index,class:"part constellation-part",style:i({transform:`rotate(${t.calculationAngle(n)}deg) skewY(-${t.calculationAngle(n,!0)}deg)`})},[o("div",{class:"text",style:i({width:`${e.width/e.prizeList.length*2}px`,top:`${e.width*.25}px`,transform:`skewY(${t.calculationAngle(n,!0)}deg)`})},u(s.name),5)],4))),128))],6),o("div",{class:"triangle-up",style:i({"border-bottom":`${e.width/2}px solid red`,left:`${e.width/2-4}px`})},null,4),o("div",{class:"circular",style:i({width:`${e.width/10}px`,height:`${e.width/10}px`,top:`${e.width/2-e.width/20}px`,left:`${e.width/2-e.width/20}px`,"border-radius":`${e.width/10}px`})},null,4)],4),e.isTake?(d(),c("div",z,"中奖："+u(e.prizeName),1)):(d(),c("button",{key:0,class:"but",onClick:l[0]||(l[0]=(...s)=>t.luckDraw&&t.luckDraw(...s))},"抽 奖"))],4)}const v=h(x,[["render",f],["__scopeId","data-v-e38eb4a2"],["__file","Turntable.vue"]]);export{v as default};
