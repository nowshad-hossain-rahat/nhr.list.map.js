/*
	Name : nhrQuery.js
	Author : Nowshad Hossain Rahat
	Type : JavaScript Library
*/




/* THE LIST OBJECT */

function nhrList(arr){	
	let listArray=[];
	if(typeof arr==="object")
	{
	  for(let item of arr)
	  {
	    if(listArray.indexOf(item)<0){listArray.push(item);}
	  }
	}
	
	const listProperties={
	  add:(item)=>
	  {
	    if(listArray.indexOf(item)<0)
	    {
	      listArray.push(item);
	    }
	    return listProperties;
	  },
	  addTo:(index,item)=>
	  {
	    listArray.splice(index,1,item);
	    return listProperties;
	  },
	  get:(index)=>
	  {
	    if(typeof index==="number" && listArray.length>index>(-1)){return listArray[index];}
	  },
	  values:()=>{return listArray;},
	  clear:()=>
	  {
	    listArray=[];
	    return listProperties;
	  },
	  delete:(item)=>
	  {
	    let i=listArray.indexOf(item);
	    if(i>(-1)){listArray.splice(i,1);} 
	    return listProperties;
	  },
	  join:(array)=>
	  {
	    if(typeof array==="object")
	    {
	      for(let item of array)
	      {listProperties.add(item)}
	    }
	    return listProperties;
	  },
	  has:(item)=>{
	    if(listArray.indexOf(item)>(-1))
	    {return true;}else{return false;}
	  },
	  each:(fun)=>
	  {
	    listArray.forEach((item,index)=>{fun(item,index)});
	  },
	  indexOf:(item)=>listArray.indexOf(item),
	  size:()=>listArray.length
	}
	return listProperties;
}


/* THE MAP OBJECT */


function nhrMap(arr){	
	let listArray=[];
	if(arr!=undefined)
	{
	  for(let item of arr)
	  {
	    if(typeof item==="string")
	    {
	      listArray.push(item);
	    }
	  }
	}
	
	const listProperties={	  
	  indexOf:(key)=>
	  {
	    let values=[];
	    listArray.forEach((it,i)=>{
	      if(it[0]===key)
	      {
	        values.push(listArray.indexOf(it));
	      }
	    });
	    return values[0];
	  },
	  get:(key)=>
	  {
	    let values=[];
	    listArray.forEach((it,i)=>{
	      if(it[0]===key)
	      {
	        values.push(it[1]);
	      }
	    });
	    return values[0];
	  },
	  delete:(key)=>
	  {
	    for(let it of listArray)
	    {
	      if(it[0]===key)
	      {
	        listArray.splice(listArray.indexOf(it),1);
	      }
	    }
	    return listProperties;
	  },
	  keys:()=>
	  {
	    let keys=[];
	    listArray.forEach((it,i)=>{
	      keys.push(it[0]);
	    });
	    return keys;
	  },
	  values:()=>
	  {
	    let vals=[];
	    listArray.forEach((it,i)=>{
	      vals.push(it[1]);
	    });
	    return vals;
	  },
	  has:(key)=>
	  {
	    let bools=[];
	    for(let it of listArray)
	    {
	      if(it[0]===key){bools.push(true);}
	    }
	    if(bools.length<1)
	    {return false;}
	    else{return true;}
	  },
	  set:(key,val)=>
	  {
	    if(listProperties.has(key))
	    {
	      let i=listProperties.indexOf(key);
	      listArray[i]=[key,val];
	    }
	    else
	    {
	      listArray.push([key,val]);
	    }
	    return listProperties;
	  },
	  each:(fun)=>
	  {
	    listArray.forEach((item,i)=>
	    {
	      let k=item[0];
	      let v=item[1];
	      fun(k,v,i);
	    });
	    return listProperties;
	  },
	  join:(obj)=>
	  {
	    for(let k in obj)
	    {
	      listProperties.set(k,obj[k]);
	    }
	    return listProperties;
	  },
	  clear:()=>{listArray=[];return listProperties;},
	  entries:()=>listArray,
	  size:()=>listArray.length
	}
	return listProperties;
}







/* nhrQuery method */

const doc=page=document;
var TOTAL_SLIDED_HEIGHT=0;
const n=nhr=nhrQuery=(selector)=>{
    
	let self=[];
	
	if(selector==window||selector==doc||selector==page||selector==document){
	    
	    self.doc=selector;
	    self.ready=(fun)=>{window.onload=fun;};
	    self.scroll=(fun)=>{window.onscroll=fun;}
	    self.write=(txt)=>{doc.write(txt)};
	    self.width=()=>window.innerWidth||doc.documentElement.clientWidth;
	    self.height=()=>window.innerHeight||doc.documentElement.clientHeight;
	    
	}else if(typeof(selector)==="string"){
	    
	    self.create=(str)=>{var div =document.createElement("div");div.innerHTML=str;return div.firstChild;};
	    try{
	    	self.elements=new nhrList(document.querySelectorAll(selector));
	    }catch(e){
	    	if(e.name=="SyntaxError"){
	    		let list=new nhrList();
	    		self.elements=list.join([self.create(selector)]);
	    		self.objectName="self";
	    	}
	    }
	    
	    self.clone=(index)=>{return self.elements[index].cloneNode(true);};	    
	    
	    self.elements.each((it,i)=>{
	    	self[i]=it;
	    });
	    
	    let elms=self;
	    
	    self.get=(index)=>{return (typeof index=='number') ? elms[index]:elms;};
	    
	    self.click=(fun)=>
	    {
	    	if(fun!=undefined)
	    	{
	    		for(let item of elms){item.addEventListener('click',fun);}
	    	}
	    	else
	    	{
	    		for(let item of elms){item.click();}
	    	}
	    	return self;
	    };
	    
	    self.dblclick=(fun)=>{if(fun!=undefined){for(let item of elms){item.addEventListener('dblclick',fun);}}return self;};
	    
	    self.keyup=(fun)=>{if(fun!=undefined){for(let item of elms){item.addEventListener('keyup',fun);}}return self;};
	    
	    self.keydown=(fun)=>{if(fun!=undefined){for(i=0;i<elms.length;i++){elms[i].addEventListener('keydown',fun);}}return self;};
	    
		self.focus=(fun)=>{if(fun!=undefined){for(i=0;i<elms.length;i++){elms[i].addEventListener('focus',fun);}}else{for(i=0;i<elms.length;i++){elms[i].focus();}}return self;};
		
		self.blur=(fun)=>{if(fun!=undefined){for(i=0;i<elms.length;i++){elms[i].addEventListener('blur',fun);}}return self;};
		
		self.change=(fun)=>{if(fun!=undefined){for(i=0;i<elms.length;i++){elms[i].addEventListener('change',fun);}}return self;};
		
		self.val=(value)=>
		{
			if(value==undefined)
			{
				return elms[0].value;
			}
			else if(typeof(value)=='function')
			{
				elms.forEach((item,i)=>
					{
						let origValue=item.value;
						item.value=value(i,origValue,item)||origValue;
					}
				);
				return self;
			}
			else
			{
				elms.forEach((item)=>{item.value=value;});
				return self;
			}
		};
				
		self.text=(value)=>
		{
			if(value==undefined)
			{
				return elms[0].innerText;
			}
			else if(typeof(value)=='function')
			{
				elms.forEach((item,i)=>
					{
						let origText=item.innerText;
						item.innerText=value(i,origText,item)||origText;
					}
				);
				return self;
			}
			else
			{
				elms.forEach((item)=>{item.innerText=value;});
				return self;
			}
		};
		
		self.html=(value)=>
		{
			if(value==undefined)
			{
				return elms[0].innerHTML;
			}
			else if(typeof(value)=='function')
			{
				elms.forEach((item,i)=>
					{
						let origHtml=item.innerHTML;
						item.innerHTML=value(i,origHtml,item)||origHtml;
					}
				);
				return self;
			}
			else
			{
				elms.forEach((item)=>{item.innerHTML=value;});
				return self;
			}
		};
		
		self.attr=(attr,val)=>
		{
			if(attr!=undefined && val==undefined)
			{
				if(typeof attr=='object')
				{
					for(let item of elms)
					{
						for(let key in attr){item.setAttribute(key,attr[key]);}
					}
				}
				else if(typeof attr == 'string')
				{
					return elms[0].getAttribute(attr);
				}
			}
			else if(attr!=undefined && val!=undefined)
			{
				if(typeof(val)=='function' && typeof(attr)=='string')
				{
					elms.forEach((item,i)=>
						{
							let origValue=item.getAttribute(attr);
							returnedValue=val(i,origValue,item)||origValue;
							item.setAttribute(attr,returnedValue);
						}
					);
				}
				else if(typeof(attr)=="string" && typeof(val)=="string")
				{
					for(let itm of elms){itm.setAttribute(attr,val);}
				}
			}
			else if(attr==undefined&&val==undefined)
			{
				return elms[0].attributes;
			}
		};
		
		self.removeAttr=(attrs)=>
		{
			if(typeof attrs==='string')
			{
				let attrList=attrs.split(' ');
				for(let elm of elms){for(let attr of attrList){elm.removeAttribute(attr)}}
			}
		}
		
		self.disabled=()=>{for(i=0;i<elms.length;i++){elms[i].disabled=true;}};
		
		self.enabled=()=>{for(i=0;i<elms.length;i++){elms[i].disabled=false;}};
	    
	    self.css=(prop,val)=>{
	    	if(prop!=undefined && typeof(prop)=="string" && val==undefined)
	    	{
	    		return window.getComputedStyle(elms[0])[prop];
	    	}
	    	else if(prop!=undefined && val!=undefined)
	    	{
	    		for(let item of elms){item.style[prop]=val;}
	    		return self;
	    	}
	    	else if(typeof(prop) == "object" && val==undefined)
	    	{
	    		for(let item of elms)
	    		{
	    			for(let key in prop)
	    			{
	    				try{
	    					item.style[key]=prop[key];
	    				}catch(e)
	    				{
	    					let st=item.getAttribute("style")||"";
	    					item.setAttribute("style",st+key+':'+prop[key]+';');
	    				}
	    			}
	    		}
	    		return self;
	    	}
	    };
	    
	    self.hide=()=>{self.css({display:"none"});return self;};    
	    
	    self.show=()=>{self.css({display:"block"});return self;};
	    
	    self.toggle=()=>{if(self.css('display')=='none'){self.show()}else{self.hide()}};
	    
	    self.src=(src)=>{self.attr("src",src);return self;};
	    
	    self.href=(href)=>{self.attr("href",href);return self;};
	    
	    self.fadeOut=(speed,callback)=>
	    {
	    	let sec="1s";
	    	if(speed==="slow")
	    	{sec="1s";speed=1000;}
	    	else if(speed==="fast")
	    	{sec="0.1s";speed=100;}
	    	else
	    	{sec=(speed/1000)+"s";}
	    	self.css({transition:sec,opacity:"0"});
	    	setTimeout(()=>{self.css({display:"none"});callback();},speed);
	    	return self;
	    };
	    
	    self.fadeIn=(speed,callback)=>
	    {
	    	let sec="1s";
	    	if(speed==="slow")
	    	{sec="1s";speed=1000;}
	    	else if(speed==="fast")
	    	{sec="0.1s";speed=100;}
	    	else
	    	{sec=(speed/1000)+"s";}
	    	self.css({transition:sec,display:"block",opacity:0});
	    	setTimeout(()=>{self.css("opacity",1)},10);
	    	setTimeout(callback,speed+10);
	    	return self;
	    };
	    
	    self.fadeToggle=(speed,callback)=>{let opa=self.css("opacity");if(opa=="1"){self.fadeOut(speed,callback)}else{self.fadeIn(speed,callback)}};
		
		self.fadeTo=(speed,opacity,callback)=>
		{
			let sec="1s";
			if(speed==="slow")
			{sec="1s";speed=1000;}
			else if(speed==="fast")
			{sec="0.1s";speed=100;}
			else
			{sec=(speed/1000)+"s";}
			self.css({transition:sec,opacity:(opacity===undefined) ? 0:opacity});
			setTimeout(callback,speed);
			return self;
		};
				
		self.animate=(css,speed,callback)=>
		{
			if(css!=undefined&&typeof(css)=='object'&&speed!=undefined)
			{
				let sec="1s";
				if(speed==="slow")
				{sec="1s";speed=1000;}
				else if(speed==="fast")
				{sec="0.1s";speed=100;}
				else
				{sec=(speed/1000)+"s";}
				self.css({transition:sec}).css(css);
				setTimeout(callback,speed);
				return self;
			}
		};
		
		self.append=(...objs)=>
		{
			for(let obj of objs){
				if(obj.objectName=="self")
				{
					let child=obj.elements[0];
					for(let i of elms){i.appendChild(child);child=child.cloneNode(true);}				
				}
				else if(typeof obj=='string')
				{
					let child=self.create(obj);
					for(const item of elms){item.appendChild(child);child=child.cloneNode(true);}	
				}
				else
				{
					let child=obj;
					for(const item of elms){item.appendChild(child);child=child.cloneNode(true);}
				}
			}
			return self;
		};
		
		self.prepend=(...objs)=>
		{
			for(let obj of objs){
				if(obj.objectName=="self")
				{
					let child=obj.elements[0];
					for(let i of elms){let fChild=i.firstChild;i.insertBefore(child,fChild);child=child.cloneNode(true);}				
				}
				else if(typeof obj=='string')
				{
					let child=self.create(obj);
					for(const item of elms){let fChild=item.firstChild;item.insertBefore(child,fChild);child=child.cloneNode(true);}	
				}
				else
				{
					let child=obj;
					for(const item of elms){item.appendChild(child);child=child.cloneNode(true);}
				}
			}
			return self;
		};
		
		self.before=(...objs)=>
		{
			for(let obj of objs){
				if(obj.objectName=="self")
				{
					let child=obj.elements[0];
					for(let i of elms){let parent=i.parentNode;parent.insertBefore(child,i);child=child.cloneNode(true);}				
				}
				else if(typeof obj=='string')
				{
					let child=self.create(obj);
					for(const item of elms){let parent=item.parentNode;parent.insertBefore(child,item);child=child.cloneNode(true);}	
				}
				else
				{
					let child=obj;
					for(const item of elms){let parent=item.parentNode;parent.insertBefore(child,item);child=child.cloneNode(true);}
				}
			}
			return self;
		};
		
		self.after=(...objs)=>
		{
			for(let obj of objs){
				if(obj.objectName=="self")
				{
					let child=obj.elements[0];
					for(let i of elms){let parent=i.parentNode;parent.insertBefore(child,i.nextSibling);child=child.cloneNode(true);}				
				}
				else if(typeof obj=='string')
				{
					let child=self.create(obj);
					for(const item of elms){let parent=item.parentNode;parent.insertBefore(child,item.nextSibling);child=child.cloneNode(true);}	
				}
				else
				{
					let child=obj;
					for(const item of elms){let parent=item.parentNode;parent.insertBefore(child,item.nextSibling);child=child.cloneNode(true);}
				}
			}
			return self;
		};
		
		self.remove=(selectors)=>
		{
			if(selectors==undefined||selectors=="")
			{
				for(let it of elms){it.parentNode.removeChild(it);}
			}
			else
			{
				let selList=selectors.split(',');
				let items=new nhrList();
				for(let s of selList)
				{
					let itms=document.querySelector('body').querySelectorAll(selector+s);
					for(let i of itms){items.add(i)}
				}
				items.each((i)=>{i.parentNode.removeChild(i);});
			}
			return self;
		};
		
		self.empty=()=>
		{
			let childs=new nhrList();
			for(let i of elms){for(let ch of i.childNodes){childs.add(ch)}}
			childs.each((child)=>{child.parentNode.removeChild(child);});
			return self;
		};
		
		self.addClass=(classNames)=>
		{
			let classNameList=classNames.split(' ');
			for(let elm of elms){for(let className of classNameList){elm.classList.add(className)}}
			return self;
		};
		
		self.removeClass=(classNames)=>
		{
			let classNameList=classNames.split(' ');
			for(let elm of elms){for(let className of classNameList){elm.classList.remove(className)}}
			return self;
		};
		
		self.toggleClass=(classNames)=>
		{
			let classNameList=classNames.split(' ');
			for(let elm of elms){for(let className of classNameList){elm.classList.toggle(className)}}
			return self;
		};
		
		self.outerWidth=(withMargin)=>
		{
			if(withMargin===true)
			{
				let ml=self.css('marginLeft').replace('px','').trim();
				let mr=self.css('marginRight').replace('px','').trim();
				let totalM=parseFloat(ml)+parseFloat(mr);
				let width=self.css("width").replace('px','');
				return parseFloat(width)+totalM;
			}
			else
			{
				let width=self.css("width").replace('px','');
				return width;
			}
		};
		
		self.innerWidth=()=>
		{
			let width=self.css("width").replace('px','');
			let brw=self.css('borderRightWidth').replace('px','');
			let blw=self.css('border-left-width').replace('px','');
			let totalBW=parseFloat(brw)+parseFloat(blw);
			return width-totalBW;
		};
		
		self.width=(width)=>
		{
			let brw=self.css('borderRightWidth').replace('px','');
			let blw=self.css('border-left-width').replace('px','');
			let totalBW=parseFloat(brw)+parseFloat(blw);
			let pl=self.css('paddingLeft').replace('px','');
			let pr=self.css('paddingRight').replace('px','');
			let totalP=parseFloat(pl)+parseFloat(pr);
			
			if(typeof width=="number")
			{
				let totalWidth = width+totalBW+totalP;
				self.css('width',totalWidth+'px');
				return self;
			}
			else
			{
				let width=self.css("width").replace('px','');
				return parseFloat(width)-totalBW-totalP;
			}
		};
		
		self.height=(height)=>
		{
			let btw=self.css('borderTopWidth').replace('px','');
			let bbw=self.css('borderBottomWidth').replace('px','');
			let totalBW=parseFloat(btw)+parseFloat(bbw);
			let pt=self.css('paddingTop').replace('px','');
			let pb=self.css('paddingBottom').replace('px','');
			let totalP=parseFloat(pt)+parseFloat(pb);
			
			if(typeof height=="number")
			{
				let totalHeight = height+totalBW+totalP;
				self.css('height',totalHeight+'px');
				return self;
			}
			else
			{
				let height=self.css("height").replace('px','');
				return parseFloat(height)-totalBW-totalP;
			}
		};
		
		self.innerHeight=()=>
		{
			let height=self.css("height").replace('px','');
			let btw=self.css('borderTopWidth').replace('px','');
			let bbw=self.css('borderBottomWidth').replace('px','');
			let totalBW=parseFloat(btw)+parseFloat(bbw);
			return parseFloat(height)-totalBW;
		};
		
		self.outerHeight=(withMargin)=>
		{
			if(withMargin===true)
			{
				let mt=self.css('marginTop').replace('px','').trim();
				let mb=self.css('marginBottom').replace('px','').trim();
				let totalM=parseFloat(mt)+parseFloat(mb);
				let height=self.css("height").replace('px','');
				return parseFloat(height)+totalM;
			}
			else
			{
				let height=self.css("height").replace('px','');
				return parseFloat(height);
			}
		};
		
		self.margin=(margin)=>
		{
			if(margin==undefined)
			{
				return self.css("margin");
			}
			else
			{
				self.css('margin',margin);
				return self;
			}
		};
		
		self.padding=(padding)=>
		{
			if(padding==undefined)
			{
				return self.css("padding");
			}
			else
			{
				self.css('padding',padding);
				return self;
			}
		};
		
		self.parent=()=>
		{
			let list=new nhrList();
			elms.forEach((it,i)=>{
				list.add(it.parentNode);
			});
			while(self.length>0){self.pop()}
			list.each((it,i)=>{
				self.push(it);
			});
			return self;
		};
		
		self.parents=(matches)=>
		{
			let matchesList=new nhrList(document.querySelectorAll(matches));
			let list=new nhrList();
			elms.forEach((it,i)=>{
				let it2=it;
				while(it2.parentNode)
				{
					if(elms.indexOf(it2)==(-1) && matchesList.has(it2))
					{
						list.add(it2);
					}
					it2=it2.parentNode;
				}
			});
			
			while(self.length>0){self.pop()}
			list.each((it,i)=>{
				self.push(it);
			});
			return self;
		};
			
		self.parentsUntil=(until)=>
		{
			let untilItems=new nhrList(document.querySelectorAll(until));
			let list=new nhrList();
			elms.forEach((it,i)=>{
				let it2=it;
				while(it2.parentNode)
				{
					if(untilItems.has(it2))
					{
						return;
					}
					if(elms.indexOf(it2)==(-1))
					{
					list.add(it2);
					}
					it2=it2.parentNode;
				}
			});
		
			while(self.length>0){self.pop()}
			list.each((it,i)=>{
			self.push(it);
			});
			return self;
		};
		
		self.children=(matches)=>
		{
			let list=new nhrList();
			elms.forEach((it,i)=>{
				for(let i2 of it.childNodes)
				{
					list.join(it.childNodes);
				}
			});
			while(self.length>0){self.pop()}
				list.each((it,i)=>{
				self.push(it);
			});
			return self;
		};
		
		
		
	/* self.IS THE ENDING POINT OF THE FUNCTION */
	}
    return self;
}

/* THESE ARE SOME SPECIAL METHODS FOR MORE HANDY USABILITY */

nhrQuery.select=(selector)=>{return document.querySelector(selector);}
nhrQuery.selectAll=(selector)=>{return document.querySelectorAll(selector);}
nhrQuery.selectById=(selector)=>{return document.getElementById(selector);}
nhrQuery.selectByClass=(selector)=>{return document.getElementsByClassName(selector);}
nhrQuery.create=(tagName)=>{return document.createElement(tagName);}
nhrQuery.noConflict=()=>{n=null;return nhrQuery;};
