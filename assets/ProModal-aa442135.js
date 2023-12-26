import{a as c}from"./index-410a2c51.js";import{f,h as _,m as r,r as b,o as v,c as g,e as l,w as n,d as y,N as C,u as N,F as w,_ as M}from"./app-037f133e.js";const P=f({__name:"ProModal",setup(x){const a=_(),s=[{label:"奖品名",prop:"awardName",el:"input",rules:[{required:!0,message:"Please input Activity name",trigger:"blur"}]},{label:"奖品名",prop:"awardName2",el:"select",enum:[{label:"测试奖品",value:"1"}],enterProps:{clearable:!0},rules:[{required:!0,message:"Please input Activity name",trigger:"blur"}]}],m=r({title:"测试Modal"}),t=r({awardName:11111}),u=()=>{var e;(e=a.value)==null||e.show({formData:{awardName:"22222"},title:"测试0002"})},d=e=>{console.log(e)};return(e,o)=>{const i=b("el-button");return v(),g(w,null,[l(i,{type:"primary",onClick:u},{default:n(()=>[y("打开Modal框")]),_:1}),l(N(c),{column:s,modelValue:t,"onUpdate:modelValue":o[0]||(o[0]=p=>t=p),modal:m,form:{},ref_key:"proModalRef",ref:a,validate:"",onSubmit:d},{default:n(()=>[C(` <template #footer>\r
      <div class="dialog-footer" style="text-align: end;">\r
        <el-button>Cancel</el-button>\r
        <el-button type="primary">\r
          Confirm\r
        </el-button>\r
      </div>\r
    </template> `)]),_:1},8,["modelValue","modal"])],64)}}}),A=M(P,[["__file","ProModal.vue"]]);export{A as default};
