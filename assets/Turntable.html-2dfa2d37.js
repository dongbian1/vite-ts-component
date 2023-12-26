import{_ as a,r as t,o as p,c as e,e as o,b as n,a as c}from"./app-037f133e.js";const l={},i=n("h1",{style:{"text-align":"center"}},"转盘小游戏",-1),u=n("div",{style:{display:"flex",color:"#999","justify-content":"space-around"}},[n("div",null,"作者：陈佳鑫"),n("div",null,"时间：2022-10-25")],-1),r=n("br",null,null,-1),k=n("p",null,"使用 VUE CSS 动画编写转盘小游戏",-1),d=c(`<br><p>通过 CSS <code>transform</code> 设置 div 旋转得到夹角，使用 css 动画<code>animation: rotate 10s 1 ease-in-out;</code> 进行整体 DIV 旋转 10 秒内总共旋转 10 圈旋转方式由慢到快，在由快到慢直至停下， 点击抽奖获取当前中奖位置，计算旋转停下后位置放入<code>--prizeAngle</code>scss 变量</p><h3 id="计算每个奖品夹角" tabindex="-1"><a class="header-anchor" href="#计算每个奖品夹角" aria-hidden="true">#</a> 计算每个奖品夹角</h3><p>通过中奖数组个数计算当前每个奖品夹角大小</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token function">calculationAngle</span><span class="token punctuation">(</span><span class="token parameter">index<span class="token punctuation">,</span> isSkewY</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 获取当前奖品数组个数</span>
  <span class="token keyword">const</span> number <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>prizeList<span class="token punctuation">.</span>length<span class="token punctuation">;</span>
  <span class="token comment">// 奖品个数是否能被360°圆型整除</span>
  <span class="token keyword">let</span> surplus <span class="token operator">=</span> <span class="token number">360</span> <span class="token operator">%</span> number<span class="token punctuation">;</span>
  <span class="token comment">// 默认圆形角度</span>
  <span class="token keyword">let</span> angle <span class="token operator">=</span> <span class="token number">360</span><span class="token punctuation">;</span>
  <span class="token comment">// 如果数组个数不能整除360°圆形将多余部分留出</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>surplus <span class="token operator">!==</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    angle <span class="token operator">=</span> angle <span class="token operator">-</span> surplus<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token comment">// 计算得出每个奖品夹角度数</span>
  <span class="token keyword">let</span> value <span class="token operator">=</span> angle <span class="token operator">/</span> number<span class="token punctuation">;</span>
  <span class="token comment">// 计算奖品夹角开始度数</span>
  <span class="token keyword">let</span> rotate <span class="token operator">=</span> value <span class="token operator">*</span> index <span class="token operator">-</span> value <span class="token operator">/</span> <span class="token number">2</span><span class="token punctuation">;</span>
  <span class="token comment">// 计算skewY度数等大三角形div</span>
  <span class="token keyword">let</span> skewY <span class="token operator">=</span> <span class="token number">90</span> <span class="token operator">-</span> value<span class="token punctuation">;</span>
  <span class="token comment">// 渲染最后一个奖品时增加之前留出不能整除角度</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>index <span class="token operator">===</span> number <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    skewY <span class="token operator">-=</span> surplus<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token comment">// isSkew判断是开始角度还是结束角度</span>
  <span class="token keyword">return</span> isSkewY <span class="token operator">?</span> skewY <span class="token operator">:</span> rotate<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="计算本次中奖数据" tabindex="-1"><a class="header-anchor" href="#计算本次中奖数据" aria-hidden="true">#</a> 计算本次中奖数据</h3><p>通过随机数生成，计算本次抽奖奖品，获取到当前奖品顺序后，计算奖品在圆盘角度，最后计算圆盘停止角度为奖品角度中间值</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token function">uckDraw</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 通过随机数计算本次抽奖奖品</span>
  <span class="token keyword">const</span> prize <span class="token operator">=</span> Math<span class="token punctuation">.</span><span class="token function">abs</span><span class="token punctuation">(</span>
    Math<span class="token punctuation">.</span><span class="token function">round</span><span class="token punctuation">(</span>Math<span class="token punctuation">.</span><span class="token function">random</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">*</span> <span class="token keyword">this</span><span class="token punctuation">.</span>prizeList<span class="token punctuation">.</span>length <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span>
  <span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token comment">// 计算每个奖品夹角，取整</span>
  <span class="token keyword">const</span> includedAngle <span class="token operator">=</span> <span class="token function">parseInt</span><span class="token punctuation">(</span><span class="token number">360</span> <span class="token operator">/</span> <span class="token keyword">this</span><span class="token punctuation">.</span>prizeList<span class="token punctuation">.</span>length<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token comment">// 计算当前中奖角度 360 - (this.calculationAngle(prize) + includedAngle / 2)</span>
  <span class="token comment">// 用停止角度加上中奖角度得到转盘停止位置</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>prizeAngle <span class="token operator">=</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">rotate(</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token number">3600</span> <span class="token operator">+</span> <span class="token number">360</span> <span class="token operator">-</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">calculationAngle</span><span class="token punctuation">(</span>prize<span class="token punctuation">)</span> <span class="token operator">+</span> includedAngle <span class="token operator">/</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">deg)</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">;</span>
  <span class="token comment">// 本次抽中奖品名称</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>prizeName <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>prizeList<span class="token punctuation">[</span>prize<span class="token punctuation">]</span><span class="token punctuation">.</span>name
  <span class="token comment">// 开始抽奖</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>isTake <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
  <span class="token comment">// 10秒出现抽奖按钮</span>
  <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>isTake <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span><span class="token number">10000</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="整体代码" tabindex="-1"><a class="header-anchor" href="#整体代码" aria-hidden="true">#</a> 整体代码###</h3><div class="language-vue line-numbers-mode" data-ext="vue"><pre class="language-vue"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>index<span class="token punctuation">&quot;</span></span> <span class="token attr-name">:style</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>{ &#39;--prizeAngle&#39;: prizeAngle }<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">ref</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>container<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span>
      <span class="token attr-name">:style</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>{
        width: width + 2 + &#39;px&#39;,
        position: &#39;relative&#39;,
        margin: &#39;auto&#39;,
        overflow: &#39;hidden&#39;
      }<span class="token punctuation">&quot;</span></span>
    <span class="token punctuation">&gt;</span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span>
        <span class="token attr-name">:class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>isTake ? &#39;disc move&#39; : &#39;disc&#39;<span class="token punctuation">&quot;</span></span>
        <span class="token attr-name">:style</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>{
          width: width + &#39;px&#39;,
          height: \`\${width}px\`,
          &#39;border-radius&#39;: \`\${width}px\`,
          transform: prizeAngle
        }<span class="token punctuation">&quot;</span></span>
      <span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span>
          <span class="token attr-name">v-for</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>(item, index) in prizeList<span class="token punctuation">&quot;</span></span>
          <span class="token attr-name">:key</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>item.index<span class="token punctuation">&quot;</span></span>
          <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>part constellation-part<span class="token punctuation">&quot;</span></span>
          <span class="token attr-name">:style</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>{
            transform: \`rotate(\${calculationAngle(
              index
            )}deg) skewY(-\${calculationAngle(index, true)}deg)\`
          }<span class="token punctuation">&quot;</span></span>
        <span class="token punctuation">&gt;</span></span>
          <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span>
            <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>text<span class="token punctuation">&quot;</span></span>
            <span class="token attr-name">:style</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>{
              width: \`\${(width / prizeList.length) * 2}px\`,
              top: \`\${width * 0.25}px\`,
              transform: \`skewY(\${calculationAngle(index, true)}deg)\`
            }<span class="token punctuation">&quot;</span></span>
          <span class="token punctuation">&gt;</span></span>
            {{ item.name }}
          <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span>
        <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>triangle-up<span class="token punctuation">&quot;</span></span>
        <span class="token attr-name">:style</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>{
          &#39;border-bottom&#39;: \`\${width / 2}px solid red\`,
          left: \`\${width / 2 - 4}px\`
        }<span class="token punctuation">&quot;</span></span>
      <span class="token punctuation">/&gt;</span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span>
        <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>circular<span class="token punctuation">&quot;</span></span>
        <span class="token attr-name">:style</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>{
          width: \`\${width / 10}px\`,
          height: \`\${width / 10}px\`,
          top: \`\${width / 2 - width / 20}px\`,
          left: \`\${width / 2 - width / 20}px\`,
          &#39;border-radius&#39;: \`\${width / 10}px\`
        }<span class="token punctuation">&quot;</span></span>
      <span class="token punctuation">/&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name">v-if</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>!isTake<span class="token punctuation">&quot;</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>but<span class="token punctuation">&quot;</span></span> <span class="token attr-name">@click</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>luckDraw<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>抽 奖<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">v-else</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>prizeName<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>中奖：{{ prizeName }}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  <span class="token function">data</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">width</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
      <span class="token literal-property property">isTake</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
      <span class="token literal-property property">prizeAngle</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
      <span class="token literal-property property">prizeList</span><span class="token operator">:</span> <span class="token punctuation">[</span>
        <span class="token punctuation">{</span> <span class="token literal-property property">index</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;一等奖&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">color</span><span class="token operator">:</span> <span class="token string">&#39;red&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token punctuation">{</span> <span class="token literal-property property">index</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;二等奖&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">color</span><span class="token operator">:</span> <span class="token string">&#39;red&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token punctuation">{</span> <span class="token literal-property property">index</span><span class="token operator">:</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;三等奖&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">color</span><span class="token operator">:</span> <span class="token string">&#39;red&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token punctuation">{</span> <span class="token literal-property property">index</span><span class="token operator">:</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;四等奖&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">color</span><span class="token operator">:</span> <span class="token string">&#39;red&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token punctuation">{</span> <span class="token literal-property property">index</span><span class="token operator">:</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;五等奖&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">color</span><span class="token operator">:</span> <span class="token string">&#39;red&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token punctuation">{</span> <span class="token literal-property property">index</span><span class="token operator">:</span> <span class="token number">6</span><span class="token punctuation">,</span> <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;六等奖&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">color</span><span class="token operator">:</span> <span class="token string">&#39;red&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token punctuation">{</span> <span class="token literal-property property">index</span><span class="token operator">:</span> <span class="token number">7</span><span class="token punctuation">,</span> <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;谢谢惠顾&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">color</span><span class="token operator">:</span> <span class="token string">&#39;red&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token punctuation">{</span> <span class="token literal-property property">index</span><span class="token operator">:</span> <span class="token number">8</span><span class="token punctuation">,</span> <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;再来一次&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">color</span><span class="token operator">:</span> <span class="token string">&#39;red&#39;</span> <span class="token punctuation">}</span>
      <span class="token punctuation">]</span><span class="token punctuation">,</span>
      <span class="token literal-property property">prizeName</span><span class="token operator">:</span> <span class="token keyword">null</span><span class="token punctuation">,</span>
      <span class="token literal-property property">style</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token function">mounted</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> width <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>$refs<span class="token operator">?.</span>container<span class="token punctuation">.</span>scrollWidth
    <span class="token keyword">this</span><span class="token punctuation">.</span>width <span class="token operator">=</span> width
    window<span class="token punctuation">.</span><span class="token function-variable function">onresize</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>$refs<span class="token operator">?.</span>container<span class="token punctuation">.</span>scrollWidth<span class="token punctuation">)</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>width <span class="token operator">=</span> <span class="token function">parseInt</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>$refs<span class="token operator">?.</span>container<span class="token punctuation">.</span>scrollWidth<span class="token punctuation">)</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">methods</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token function">calculationAngle</span><span class="token punctuation">(</span><span class="token parameter">index<span class="token punctuation">,</span> isSkewY</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// 获取当前奖品数组个数</span>
      <span class="token keyword">const</span> number <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>prizeList<span class="token punctuation">.</span>length
      <span class="token comment">// 奖品个数是否能被360°圆型整除</span>
      <span class="token keyword">let</span> surplus <span class="token operator">=</span> <span class="token number">360</span> <span class="token operator">%</span> number
      <span class="token comment">// 默认圆形角度</span>
      <span class="token keyword">let</span> angle <span class="token operator">=</span> <span class="token number">360</span>
      <span class="token comment">// 如果数组个数不能整除360°圆形将多余部分留出</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>surplus <span class="token operator">!==</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        angle <span class="token operator">=</span> angle <span class="token operator">-</span> surplus
      <span class="token punctuation">}</span>
      <span class="token comment">// 计算得出每个奖品夹角度数</span>
      <span class="token keyword">let</span> value <span class="token operator">=</span> angle <span class="token operator">/</span> number
      <span class="token comment">// 计算奖品夹角开始度数</span>
      <span class="token keyword">let</span> rotate <span class="token operator">=</span> value <span class="token operator">*</span> index <span class="token operator">-</span> value <span class="token operator">/</span> <span class="token number">2</span>
      <span class="token comment">// 计算skewY度数等大三角形div</span>
      <span class="token keyword">let</span> skewY <span class="token operator">=</span> <span class="token number">90</span> <span class="token operator">-</span> value
      <span class="token comment">// 渲染最后一个奖品时增加之前留出不能整除角度</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>index <span class="token operator">===</span> number <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        skewY <span class="token operator">-=</span> surplus
      <span class="token punctuation">}</span>
      <span class="token comment">// isSkew判断是开始角度还是结束角度</span>
      <span class="token keyword">return</span> isSkewY <span class="token operator">?</span> skewY <span class="token operator">:</span> rotate
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token comment">// 计算本次中奖</span>
    <span class="token function">luckDraw</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// 通过随机数计算本次中奖</span>
      <span class="token keyword">const</span> prize <span class="token operator">=</span> Math<span class="token punctuation">.</span><span class="token function">abs</span><span class="token punctuation">(</span>
        Math<span class="token punctuation">.</span><span class="token function">round</span><span class="token punctuation">(</span>Math<span class="token punctuation">.</span><span class="token function">random</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">*</span> <span class="token keyword">this</span><span class="token punctuation">.</span>prizeList<span class="token punctuation">.</span>length <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span>
      <span class="token punctuation">)</span>
      <span class="token comment">// 计算每个奖品夹角，取整</span>
      <span class="token keyword">const</span> includedAngle <span class="token operator">=</span> <span class="token function">parseInt</span><span class="token punctuation">(</span><span class="token number">360</span> <span class="token operator">/</span> <span class="token keyword">this</span><span class="token punctuation">.</span>prizeList<span class="token punctuation">.</span>length<span class="token punctuation">)</span>
      <span class="token comment">// 计算当前中奖角度 360 - (this.calculationAngle(prize) + includedAngle / 2)</span>
      <span class="token comment">// 用停止角度加上中奖角度得到转盘停止位置</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>prizeAngle <span class="token operator">=</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">rotate(</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>
        <span class="token number">3600</span> <span class="token operator">+</span> <span class="token number">360</span> <span class="token operator">-</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">calculationAngle</span><span class="token punctuation">(</span>prize<span class="token punctuation">)</span> <span class="token operator">+</span> includedAngle <span class="token operator">/</span> <span class="token number">2</span><span class="token punctuation">)</span>
      <span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">deg)</span><span class="token template-punctuation string">\`</span></span>
      <span class="token comment">// 本次抽中奖品名称</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>prizeName <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>prizeList<span class="token punctuation">[</span>prize<span class="token punctuation">]</span><span class="token punctuation">.</span>name
      <span class="token comment">// 开始抽奖</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>isTake <span class="token operator">=</span> <span class="token boolean">true</span>
      <span class="token comment">// 10秒出现抽奖按钮</span>
      <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>isTake <span class="token operator">=</span> <span class="token boolean">false</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">10000</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>style</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>scss<span class="token punctuation">&quot;</span></span> <span class="token attr-name">scoped</span><span class="token punctuation">&gt;</span></span><span class="token style"><span class="token language-css">
<span class="token selector">.index</span> <span class="token punctuation">{</span>
  <span class="token property">text-align</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span>
  <span class="token selector">.disc</span> <span class="token punctuation">{</span>
    <span class="token property">margin</span><span class="token punctuation">:</span> 0 auto<span class="token punctuation">;</span>
    <span class="token property">width</span><span class="token punctuation">:</span> 500px<span class="token punctuation">;</span>
    <span class="token property">height</span><span class="token punctuation">:</span> 500px<span class="token punctuation">;</span>
    <span class="token property">border-radius</span><span class="token punctuation">:</span> 500px<span class="token punctuation">;</span>
    <span class="token property">position</span><span class="token punctuation">:</span> relative<span class="token punctuation">;</span>
    <span class="token property">overflow</span><span class="token punctuation">:</span> hidden<span class="token punctuation">;</span>
    <span class="token property">border</span><span class="token punctuation">:</span> 1px solid<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token atrule"><span class="token rule">@keyframes</span> rotate</span> <span class="token punctuation">{</span>
    <span class="token selector">0%</span> <span class="token punctuation">{</span>
      <span class="token property">transform</span><span class="token punctuation">:</span> <span class="token function">rotate</span><span class="token punctuation">(</span>0deg<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token selector">100%</span> <span class="token punctuation">{</span>
      <span class="token property">transform</span><span class="token punctuation">:</span> <span class="token function">var</span><span class="token punctuation">(</span>--prizeAngle<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  <span class="token selector">.move</span> <span class="token punctuation">{</span>
    <span class="token property">animation</span><span class="token punctuation">:</span> rotate 10s 1 ease-in-out<span class="token punctuation">;</span>
    <span class="token property">transform</span><span class="token punctuation">:</span> <span class="token function">var</span><span class="token punctuation">(</span>--prizeAngle<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token selector">.constellation-part</span> <span class="token punctuation">{</span>
    <span class="token property">position</span><span class="token punctuation">:</span> absolute<span class="token punctuation">;</span>
    <span class="token property">top</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
    <span class="token property">right</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
    <span class="token property">width</span><span class="token punctuation">:</span> 50%<span class="token punctuation">;</span>
    <span class="token property">height</span><span class="token punctuation">:</span> 50%<span class="token punctuation">;</span>
    <span class="token property">transform-origin</span><span class="token punctuation">:</span> 0 100%<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token selector">.part</span> <span class="token punctuation">{</span>
    <span class="token property">border-left</span><span class="token punctuation">:</span> 1px solid #333<span class="token punctuation">;</span>
    <span class="token selector">.text</span> <span class="token punctuation">{</span>
      <span class="token property">text-align</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span>
      <span class="token property">position</span><span class="token punctuation">:</span> relative<span class="token punctuation">;</span>
      <span class="token property">top</span><span class="token punctuation">:</span> 120px<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  <span class="token selector">.triangle-up</span> <span class="token punctuation">{</span>
    <span class="token property">width</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
    <span class="token property">height</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
    <span class="token property">border-left</span><span class="token punctuation">:</span> 5px solid transparent<span class="token punctuation">;</span>
    <span class="token property">border-right</span><span class="token punctuation">:</span> 5px solid transparent<span class="token punctuation">;</span>
    <span class="token property">border-bottom</span><span class="token punctuation">:</span> 250px solid red<span class="token punctuation">;</span>
    <span class="token property">position</span><span class="token punctuation">:</span> absolute<span class="token punctuation">;</span>
    <span class="token property">top</span><span class="token punctuation">:</span> 0px<span class="token punctuation">;</span>
    <span class="token property">left</span><span class="token punctuation">:</span> 246px<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token selector">.circular</span> <span class="token punctuation">{</span>
    <span class="token property">width</span><span class="token punctuation">:</span> 50px<span class="token punctuation">;</span>
    <span class="token property">height</span><span class="token punctuation">:</span> 50px<span class="token punctuation">;</span>
    <span class="token property">border-radius</span><span class="token punctuation">:</span> 50px<span class="token punctuation">;</span>
    <span class="token property">position</span><span class="token punctuation">:</span> absolute<span class="token punctuation">;</span>
    <span class="token property">top</span><span class="token punctuation">:</span> 225px<span class="token punctuation">;</span>
    <span class="token property">left</span><span class="token punctuation">:</span> 226px<span class="token punctuation">;</span>
    <span class="token property">background</span><span class="token punctuation">:</span> red<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token selector">.but</span> <span class="token punctuation">{</span>
    <span class="token property">cursor</span><span class="token punctuation">:</span> pointer<span class="token punctuation">;</span>
    <span class="token property">margin-top</span><span class="token punctuation">:</span> 50px<span class="token punctuation">;</span>
    <span class="token property">width</span><span class="token punctuation">:</span> 200px<span class="token punctuation">;</span>
    <span class="token property">height</span><span class="token punctuation">:</span> 50px<span class="token punctuation">;</span>
    <span class="token property">border-style</span><span class="token punctuation">:</span> none<span class="token punctuation">;</span>
    <span class="token property">background</span><span class="token punctuation">:</span> #409eff<span class="token punctuation">;</span>
    <span class="token property">color</span><span class="token punctuation">:</span> #fff<span class="token punctuation">;</span>
    <span class="token property">font-size</span><span class="token punctuation">:</span> 16px<span class="token punctuation">;</span>
    <span class="token property">border-radius</span><span class="token punctuation">:</span> 10px<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token selector">.prizeName</span> <span class="token punctuation">{</span>
    <span class="token property">margin-top</span><span class="token punctuation">:</span> 50px<span class="token punctuation">;</span>
    <span class="token property">color</span><span class="token punctuation">:</span> red<span class="token punctuation">;</span>
    <span class="token property">font-size</span><span class="token punctuation">:</span> 18px<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>style</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,10);function v(m,b){const s=t("Turntable");return p(),e("div",null,[i,u,r,k,o(s),d])}const y=a(l,[["render",v],["__file","Turntable.html.vue"]]);export{y as default};
