(function(l,u){typeof exports=="object"&&typeof module<"u"?u(exports):typeof define=="function"&&define.amd?define(["exports"],u):(l=typeof globalThis<"u"?globalThis:l||self,u(l.PivotheadCore={}))})(this,function(l){"use strict";function u(o,t,s){if(!o||o.length===0)return 0;const e=o.map(a=>Number(a[t])||0);switch(s){case"sum":return e.reduce((a,i)=>a+i,0);case"avg":return e.reduce((a,i)=>a+i,0)/e.length;case"min":return Math.min(...e);case"max":return Math.max(...e);case"count":return e.length;default:return 0}}function d(o,t,s){return!t||t.length===0?o:[...o].sort((e,a)=>{for(const i of t){const{field:r,direction:n,type:g,aggregation:D}=i;if(g==="measure"){const c=p(e,r),h=p(a,r);if(c!==h)return n==="asc"?c-h:h-c}else{const c=e[r],h=a[r];if(c!==h)return n==="asc"?c<h?-1:1:c>h?-1:1}}return 0})}function p(o,t,s){return Number(o[t])||0}function f(o,t=null,s=null){let e=[...o.data];t&&(e=d(e,[t]));let a=[];if(s){const{rowFields:i,columnFields:r,grouper:n}=s,g=[...i,...r];a=m(e,g,n)}return{data:e,groups:a}}function m(o,t,s){if(!t||t.length===0)return[{key:"All",items:o,subgroups:[],aggregates:{}}];const e={};return o.forEach(a=>{const i=s(a,t);e[i]||(e[i]={key:i,items:[],subgroups:[],aggregates:{}}),e[i].items.push(a)}),t.length>1&&Object.values(e).forEach(a=>{a.subgroups=m(a.items,t.slice(1),s)}),Object.values(e)}class w{constructor(t){this.config={...t,defaultAggregation:t.defaultAggregation||"sum",isResponsive:t.isResponsive??!0},this.state={data:t.data||[],processedData:{headers:[],rows:[],totals:{}},rows:t.rows||[],columns:t.columns||[],measures:t.measures||[],sortConfig:[],rowSizes:this.initializeRowSizes(t.data||[]),expandedRows:{},groupConfig:t.groupConfig||null,groups:[],selectedMeasures:t.measures||[],selectedDimensions:t.dimensions||[],selectedAggregation:this.config.defaultAggregation,formatting:t.formatting||{},columnWidths:{},isResponsive:this.config.isResponsive??!0,rowGroups:[],columnGroups:[]},this.state.processedData=this.processData(this.state.data),this.state.groupConfig&&this.applyGrouping()}initializeRowSizes(t){return t.map((s,e)=>({index:e,height:40}))}processData(t){return{headers:this.generateHeaders(),rows:this.generateRows(t),totals:this.calculateTotals(t)}}generateHeaders(){const t=this.state.rows?this.state.rows.map(e=>e.caption||e.uniqueName):[],s=this.state.columns?this.state.columns.map(e=>e.caption||e.uniqueName):[];return[...t,...s]}generateRows(t){return!t||!this.state.rows||!this.state.columns?[]:t.map(s=>[...this.state.rows.map(e=>s[e.uniqueName]),...this.state.columns.map(e=>s[e.uniqueName])])}calculateTotals(t){const s={};return this.state.measures.forEach(e=>{const{uniqueName:a,aggregation:i}=e;let r=0;i==="sum"?r=t.reduce((n,g)=>n+(g[a]||0),0):i==="avg"?r=t.reduce((n,g)=>n+(g[a]||0),0)/t.length:i==="max"?r=Math.max(...t.map(n=>n[a]||0)):i==="min"?r=Math.min(...t.map(n=>n[a]||0)):i==="count"&&(r=t.length),s[a]=r}),s}setMeasures(t){this.state.selectedMeasures=t,this.state.processedData=this.processData(this.state.data),this.updateAggregates()}setDimensions(t){this.state.selectedDimensions=t,this.state.processedData=this.processData(this.state.data),this.updateAggregates()}setAggregation(t){this.state.selectedAggregation=t,this.state.processedData=this.processData(this.state.data),this.updateAggregates(),this.updateAggregates()}formatValue(t,s){const e=this.state.formatting[s];if(!e)return String(t);try{switch(e.type){case"currency":return new Intl.NumberFormat(e.locale||"en-US",{style:"currency",currency:e.currency||"USD",minimumFractionDigits:e.decimals||0,maximumFractionDigits:e.decimals||0}).format(t);case"number":return new Intl.NumberFormat(e.locale||"en-US",{minimumFractionDigits:e.decimals||0,maximumFractionDigits:e.decimals||0}).format(t);case"percentage":return new Intl.NumberFormat(e.locale||"en-US",{style:"percent",minimumFractionDigits:e.decimals||0}).format(t);case"date":return new Date(t).toLocaleDateString(e.locale||"en-US",{dateStyle:"medium"});default:return String(t)}}catch(a){return console.error(`Error formatting value for field ${s}:`,a),String(t)}}sort(t,s){const e=this.state.measures.find(i=>i.uniqueName===t),a={field:t,direction:s,type:e?"measure":"dimension",aggregation:e==null?void 0:e.aggregation};this.state.sortConfig=[a],this.applySort(),console.log("New state after sorting:",this.state)}applySort(){const t=this.sortData(this.state.data,this.state.sortConfig[0]);this.state.data=t,this.state.groups.length>0&&(this.state.groups=this.sortGroups(this.state.groups,this.state.sortConfig[0])),this.state.processedData=this.processData(this.state.data),this.updateAggregates()}sortData(t,s){return[...t].sort((e,a)=>{const i=this.getFieldValue(e,s),r=this.getFieldValue(a,s);return i<r?s.direction==="asc"?-1:1:i>r?s.direction==="asc"?1:-1:0})}getFieldValue(t,s){if(s.type==="measure"){const e=this.state.measures.find(a=>a.uniqueName===s.field);if(e&&e.formula)return e.formula(t)}return t[s.field]}sortGroups(t,s){return[...t].sort((e,a)=>{const i=e.aggregates[`${s.aggregation}_${s.field}`]||0,r=a.aggregates[`${s.aggregation}_${s.field}`]||0;return i<r?s.direction==="asc"?-1:1:i>r?s.direction==="asc"?1:-1:0})}updateAggregates(){const t=s=>{this.state.measures.forEach(e=>{const a=`${this.state.selectedAggregation}_${e.uniqueName}`;if(e.formula&&typeof e.formula=="function"){const i=s.items.map(r=>e.formula(r));s.aggregates[a]=u(i.map(r=>({value:r})),"value",e.aggregation||this.state.selectedAggregation)}else s.aggregates[a]=u(s.items,e.uniqueName,e.aggregation||this.state.selectedAggregation)}),s.subgroups&&s.subgroups.forEach(t)};this.state.groups.forEach(t)}applyGrouping(){if(!this.state.groupConfig)return;const{rowFields:t,columnFields:s,grouper:e}=this.state.groupConfig;if(!t||!s||!e){console.error("Invalid groupConfig:",this.state.groupConfig);return}const{data:a,groups:i}=f(this.config,this.state.sortConfig[0]||null,this.state.groupConfig);this.state.data=a,this.state.groups=i,this.updateAggregates(),this.state.processedData=this.processData(this.state.data)}createGroups(t,s,e){if(!s||s.length===0||!t)return[{key:"All",items:t||[],aggregates:{}}];const a={};return t.forEach(i=>{if(i&&e){const r=e(i,s);a[r]||(a[r]={key:r,items:[],subgroups:[],aggregates:{}}),a[r].items.push(i)}}),s.length>1&&Object.values(a).forEach(i=>{i&&i.items&&(i.subgroups=this.createGroups(i.items,s.slice(1),e))}),Object.values(a).forEach(i=>{i&&i.items&&this.state.measures&&this.state.measures.forEach(r=>{if(r&&r.uniqueName){const n=`${this.state.selectedAggregation}_${r.uniqueName}`;i.aggregates[n]=u(i.items,r.uniqueName,this.state.selectedAggregation)}})}),Object.values(a)}setGroupConfig(t){this.state.groupConfig=t,t?this.applyGrouping():(this.state.groups=[],this.state.processedData=this.processData(this.state.data))}getGroupedData(){return this.state.groups}getState(){return{...this.state}}reset(){this.state={...this.state,data:this.config.data||[],processedData:this.processData(this.config.data||[]),sortConfig:[],rowSizes:this.initializeRowSizes(this.config.data||[]),expandedRows:{},groupConfig:this.config.groupConfig||null,groups:[]},this.state.groupConfig&&this.applyGrouping()}resizeRow(t,s){const e=this.state.rowSizes.findIndex(a=>a.index===t);e!==-1&&(this.state.rowSizes[e].height=Math.max(20,s))}toggleRowExpansion(t){this.state.expandedRows[t]=!this.state.expandedRows[t]}isRowExpanded(t){return!!this.state.expandedRows[t]}dragRow(t,s){const e=[...this.state.data],[a]=e.splice(t,1);e.splice(s,0,a),this.state.data=e,this.state.rowSizes=this.state.rowSizes.map((i,r)=>({...i,index:r<t||r>s?r:r<s?r+1:r-1})),this.state.processedData=this.processData(this.state.data),this.updateAggregates()}dragColumn(t,s){const e=[...this.state.columns],[a]=e.splice(t,1);e.splice(s,0,a),this.state.columns=e,this.state.processedData=this.processData(this.state.data),this.updateAggregates()}}l.PivotEngine=w,Object.defineProperty(l,Symbol.toStringTag,{value:"Module"})});
