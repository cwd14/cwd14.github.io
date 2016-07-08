//css3动画
		var forthPl = document.getElementsByClassName("player");
		forthPl[0].style.animation = "myfirst 5s infinite linear";
		forthPl[1].style.animation = "myfirst 5s infinite linear";
		forthPl[2].style.animation = "myfirst 5s infinite linear";
		//缓慢消失和出现
			var adminHeight = 0;
			var showdiv = null;
			function addDiv(divId)
			{
				adminHeight = 0;
				var tempDiv = document.getElementById(divId);
				adddiv = setInterval(function()
				{
					if(adminHeight<60)
					{
						adminHeight++;
						document.getElementById(divId).style.height = adminHeight + "px";
					}
					if(adminHeight == 60)
					{
						clearInterval(adddiv);
					}
				},30);
				
			}
			var killdiv = null;
			function killDiv(divId)
			{
				adminHeight = 60;
				var tempDiv = document.getElementById(divId);
				killdiv = setInterval(function()
				{
					if(adminHeight>0)
					{
						adminHeight--;
						document.getElementById(divId).style.height = adminHeight + "px";
					}
					if(adminHeight == 0)
					{
						clearInterval(killdiv);
					}
				},30);	
			}
			//新消息
			function handleNewMessage()
			{
				var mes = document.getElementsByClassName("mes");//说的话
				 mes[0].innerHTML = mes[1].innerHTML;
				 mes[1].innerHTML = mes[2].innerHTML;
				 mes[2].innerHTML = arguments[0].content;
				 var na = document.getElementsByClassName("nick");//昵称
				 na[0].innerHTML = na[1].innerHTML;
				 na[1].innerHTML = na[2].innerHTML;
				 na[2].innerHTML = arguments[0].nickname;
				 var he = document.getElementsByClassName("head");//头像
				 he[0].innerHTML = he[1].innerHTML;
				 he[1].innerHTML = he[2].innerHTML;
				 he[2].innerHTML = null;
				 he[2].style.animation = "myfirst 3s";
				 var img=document.createElement('img');
					img.setAttribute('src',arguments[0].headimgurl);
					img.style.width="100%";
					img.style.height="100%";
					he[2].appendChild(img); 
			}
			//历史消息
			function handlehistoryMessage()
			{
				var mes = document.getElementsByClassName("mes");//说的话
				mes[0].innerHTML = mes[1].innerHTML;
				mes[1].innerHTML = mes[2].innerHTML;
				mes[2].innerHTML = arguments[0].content;
				var na = document.getElementsByClassName("nick");//昵称
				na[0].innerHTML = na[1].innerHTML;
				na[1].innerHTML = na[2].innerHTML;
				na[2].innerHTML = arguments[0].nickname;
				var he = document.getElementsByClassName("head");//头像
				he[0].style.animation = "myfirst 3s";
				he[1].style.animation = "myfirst 3s";
				he[2].style.animation = "myfirst 3s";
				he[0].innerHTML = he[1].innerHTML;
				he[1].innerHTML = he[2].innerHTML;
				he[2].innerHTML = null;
				var img=document.createElement('img');
				img.setAttribute('src',arguments[0].headimgurl);
				img.style.width="100%";
				img.style.height="100%";
				he[2].appendChild(img);
			}
			//计时管理员消息
			var colorFlag = 1;
			var time = 0;
			var manager = null;
			function useforAdmin()
			{
				if(colorFlag==1) 
				{document.getElementById("admin").style.backgroundColor = "gold";colorFlag = 0;} 
				else
				{document.getElementById("admin").style.backgroundColor = "silver";colorFlag = 1;}
				time ++;
				if(time == 20)
				{
					document.getElementById("admin").innerHTML = null;
					document.getElementById("admin").style.backgroundColor = null;
					killDiv("admin");
				}
			}
			function handleAdminMessage()
			{
				console.log(document.getElementById("admin").innerHTML);
				var adminDiv = document.getElementById("admin");
				if(adminHeight == 0)
				{
					addDiv("admin");
				}
				
				if(time != 0)
				{
					time = 0;
					clearInterval(manager);
				}
				manager = setInterval(useforAdmin,500);
				adminDiv.innerHTML = "管理员有话说："+ arguments[0].content;		
			}
			//用来做广告
			var btnId = "btn1";
			var content = "我是广告";
			function addBtn(btnId, content)
			{
				var mydiv=document.getElementById("body");
			   var input =document.createElement("input");
			   input.type="button";
			   input.value=content;
			   input.id = btnId
			   input.style.position = "absolute";
			   input.style.left = 0+"px";
			   mydiv.appendChild(input);
			}
			addBtn(btnId,content);
			var btnpos = 0;
			var btnFlag = 1;
			function BTNmove()
			{
				if(btnFlag == 1)
				{
					btnpos += 1;
				}
				else
				{
					btnpos -= 1;
				}
				if(btnpos > document.body.clientWidth - document.getElementById(btnId).value.length * 15)
				{
					btnFlag = 0;
				}	
				if(btnpos < 0)
				{
					btnFlag = 1;
				}
				document.getElementById(btnId).style.left = btnpos+"px";
			}
			console.log(document.getElementById(btnId).value.length);
			setInterval(BTNmove, 30);
			//请求历史消息
			var number = 3;
			var getUrl = "https://wall.cgcgbcbc.com/api/messages?num=" + number;
			var socketUrl = "https://wall.cgcgbcbc.com";
			function getOldMessages(callback){
				fetch(getUrl)
					.then(function(data){
						return data.json();
					})
					.then(function(data){
						data.reverse().forEach(function(item){
							callback(item);
						});
					});
			}
			//连接服务器
			var socket = io.connect(socketUrl);
			socket.on('connect', function () {
			  console.log('connected');
			});
			socket.on('disconnect', function() {
				console.log('disconnected');
				location.reload();
			});
			//接受新消息
			socket.on('new message', function(message){
				handleNewMessage(message);
				console.log('new message');
				console.log(message);
			});
			//接受管理员消息
			socket.on('admin', function(message){
				handleAdminMessage(message);
				console.log('admin');
				console.log(message);
			});
			//请求历史消息
			getOldMessages(function(message){
				handlehistoryMessage(message);
				console.log('old massage');
				console.log(message);
			});
			console.log(getUrl);