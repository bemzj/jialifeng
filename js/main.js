//游戏初始化
LInit(1000/40,"game",1077,1920,main);
//游戏入口主函数
function main(){
    LGlobal.stageScale = LStageScaleMode.EXACT_FIT;//设置全屏变量
    LGlobal.screen(LStage.FULL_SCREEN);//设置全面适应
    LGlobal.webAudio = false;//播放音乐
    backLayer = new LSprite();//创建背景层
    addChild(backLayer);//添加背景层到游戏环境中
    musicLayer = new LSprite();//创建音乐层
    addChild(musicLayer);//添加背景层到游戏环境中
    LLoadManage.load(gameImg,'',startGame);
}
//游戏开始
function startGame(result){
	imgList=result;
	$('#loading').hide();
//	select();
//	setTimeout(function(){
//		$('#loading').hide();
//		$('#loading').fadeOut(500);
//		homepage();
//		select();
//		problem();
		showCouplet();
//		couplet();
//		showRed();
//	},3000);
//	showRed();
}
//显示对联
function showCouplet(){
	$('.er').show();
	//对联层
	var sc = new LSprite();
	sc.alpha = 0;
	backLayer.addChild(sc);
	//背景图片
	var back = new bmp(0, 0, imgList['coupleShow']);
	sc.addChild(back);
	//logo
	var logo = new bmp(0, 1825, imgList['logo']);
	logo.x = rCenterWidth(logo);
	logo.bigAndSmall(2, 2, 2, 0.05, 0, true);
	sc.addChild(logo);
	//云
	var sky = new bmp(0, 152, imgList['bigSky']);
	sky.x = rCenterWidth(sky);
	sky.bigAndSmall(2, 2, 2, 0.02, 0, true);
	sc.addChild(sky);
	//长按保存
	var btn01 = new bmp(152,1586,imgList['btn01']);
	btn01.x = rCenterWidth(btn01);
	btn01.alpha = 0;
	sc.addChild(btn01);
	
	//对联
	var title = [];
	switch(choiceType){
		case 0:
			var index = parseInt(businessUp.length*Math.random());
			title[0] = businessMiddle[index];
			title[1] = businessUp[index];
			title[2] = businessDown[index];
			break;
		case 1:
			var index = parseInt(whiteUp.length*Math.random());
			title[0] = whiteMiddle[index];
			title[1] = whiteUp[index];
			title[2] = whiteDown[index];
			break;
		case 3:
			var index = parseInt(studentUp.length*Math.random());
			title[0] = studentMiddle[index];
			title[1] = studentUp[index];
			title[2] = studentDown[index];
			break;
		case 2:
			var index = parseInt(wageUp.length*Math.random());
			title[0] = wageMiddle[index];
			title[1] = wageUp[index];
			title[2] = wageDown[index];
			break;
	}
	var reel01 = new reels(title[0],'.g3');
	sc.addChild(reel01);
	reel01.alpha = 0;
	var reel03 = new reelsv(115,604,title[1],'.g1');
	sc.addChild(reel03);
	reel03.alpha = 0;
	var reel02= new reelsv(816,604,title[2],'.g2');
	sc.addChild(reel02);
	reel02.alpha = 0;
	LTweenLite.to(sc,1.0,{alpha:1,onComplete:function(){
		LTweenLite.to(reel01,1.0,{alpha:1});
		LTweenLite.to(reel02,1.0,{alpha:1});
		LTweenLite.to(reel03,1.0,{alpha:1,onComplete:function(){
			$('.g2').fadeIn(1500,function(){
				$('.g1').fadeIn(1500,function(){
					$('.g3').fadeIn(1500,function(){
				//米粒
				var rice = new bmp(358, 1140, imgList['rice']);
				sc.addChild(rice);
				var r1 = new LTransitionManager(rice);
				var rm1 = {
					type: LTransition.Fly,
					startPoint: 6,
					duration: 0.25,
					direction: LTransition.IN,
					easing: Strong.easeIn()
				};
				r1.startTransition(rm1);
				setTimeout(function(){
					$('#img').show();
					$('#img').css('opacity', 0);
					setTimeout(function() {
						html2canvas(gameOut, {
							onrendered: function(canvas) {
								//添加属性
								canvas.setAttribute('id', 'thecanvas');
								//读取属性值
								// var value= canvas.getAttribute('id');
								document.getElementById('show').appendChild(canvas);
								$('#img').attr("src", document.getElementById('thecanvas').toDataURL("image/png"));
								LTweenLite.to(btn01, 0.5, {
									alpha: 1
								});
								var up = new bmp(0, 1800, imgList['up']);
								up.scaleX = 0.5;
								up.scaleY = 0.5;
								up.x = rCenterWidth(up);
								LTweenLite.to(up,0.8,{y:1700,alpha:0,loop:true,onComplete:function(){
									up.alpha = 1;
									up.y =  1750;
								}});
								sc.addChild(up);
								touch.on(document, 'swipeup', function(ev) {
									$('.g1').hide();
									$('.g2').hide();
									$('.g3').hide();
	                              	$('.er').show().animate({'opacity':0},1000,function(){
										$(this).hide();
									})
									LTweenLite.to(sc, 1.0, {
										alpha: 0,
										onComplete: function() {
											sc.remove();
											$('#getRed').hide();
											$('#img').hide();
										}
									});
									showRed();
	                          	});
							}
						});
					}, 20);
				},250);
					});
				});
			});
		}});
	}});
}
//首页
function homepage(){
	//首页层
	var homeLayer = new LSprite();
	backLayer.addChild(homeLayer);
	//背景图片
	var back = new bmp(0, 0, imgList['index']);
	homeLayer.addChild(back);
	//灯笼
	var lantern1 = new bmp(45, 440, imgList['lantern1']);
	lantern1.rotateCenter = false;
	homeLayer.addChild(lantern1);
	LTweenLite.to(lantern1, 1, {
		rotate: 5,
		loop: true,
		ease: LEasing.None.easeIn()
	}).to(lantern1, 1, {
		rotate: 0,
		ease: LEasing.None.easeIn()
	});
	var lantern2 = new bmp(135, 410, imgList['lantern2']);
	lantern2.rotateCenter = false;
	homeLayer.addChild(lantern2);
	LTweenLite.to(lantern2, 1.2, {
		rotate: -5,
		loop: true,
		ease: LEasing.None.easeIn()
	}).to(lantern2, 1.2, {
		rotate: 0,
		ease: LEasing.None.easeIn()
	});
	//云
	var sky = new bmp(0, 297, imgList['sky']);
	sky.x = rCenterWidth(sky);
	sky.bigAndSmall(2, 2, 2, 0.02, 0, true);
	homeLayer.addChild(sky);
	//顶部
	var top = new bmp(0, 0, imgList['top']);
	top.rotateCenter = false;
	homeLayer.addChild(top);
	var tmTop = new LTransitionManager(top);
	var tpTop = {
		type: LTransition.Fly,
		startPoint: 2,
		duration: 0.2,
		direction: LTransition.IN,
		easing: Strong.easeIn()
	};
	tmTop.startTransition(tpTop);
	//底部
	var bottom = new bmp(0, 0, imgList['bottom']);
	bottom.rotateCenter = false;
	bottom.y = LGlobal.height - bottom.getHeight();
	homeLayer.addChild(bottom);
	var tmBottom = new LTransitionManager(bottom);
	var tpBottom = {
		type: LTransition.Fly,
		startPoint: 8,
		duration: 0.2,
		direction: LTransition.IN,
		easing: Strong.easeIn()
	};
	tmBottom.startTransition(tpBottom);
	//标题
	var tTime = 0.5;
	var tRotate = 360;
	var delay = 0.5;
	var title01 = rBmp(imgList['title01']); //89
	title01.y = 80;
	title01.x = -title01.getWidth() - 229;
	title01.rotateCenter = true;
	homeLayer.addChild(title01);
	LTweenLite.to(title01, tTime, {
		rotate: tRotate,
		x: 89,
		ease: LEasing.None.easeIn(),
		delay: delay
	});
	var title02 = rBmp(imgList['title04']); //318
	title02.y = 80;
	title02.x = -title02.getWidth();
	title02.rotateCenter = true;
	homeLayer.addChild(title02);
	LTweenLite.to(title02, tTime, {
		rotate: tRotate,
		x: 318,
		ease: LEasing.None.easeIn(),
		delay: delay
	});
	var title03 = rBmp(imgList['title02']); //548
	title03.y = 80;
	title03.x = 1077;
	title03.rotateCenter = true;
	homeLayer.addChild(title03);
	LTweenLite.to(title03, tTime, {
		rotate: -tRotate,
		x: 548,
		ease: LEasing.None.easeIn(),
		delay: delay
	});
	var title04 = rBmp(imgList['title03']); //778
	title04.y = 80;
	title04.x = 1307;
	title04.rotateCenter = true;
	homeLayer.addChild(title04);
	//开始游戏按钮
	var start = new btn(0, 1591, imgList['start']);
	start.x = rCenterWidth(start);
	start.bigAndSmall(2, 2, 1, 0.05, 0, true);
	homeLayer.addChild(start);
	
	//文案
	var indexWord = ["2018我们不一样", "个性测试", "领取专属春联", "定制祝福", "把红包带回“嘉”"];
	var words = [];
	for(var i = 0; i < indexWord.length; i++) {
		words[i] = new setWrapText(0, 435 + i * 100, 52, indexWord[i], '#ffc727', false, 420, false, 48, 3, 'happy');
		homeLayer.addChild(words[i]);
		words[i].x = rCenterWidth(words[i]);
		words[i].alpha = 0;
	}
	LTweenLite.to(title04, tTime, {
		rotate: -tRotate,
		x: 778,
		ease: LEasing.None.easeIn(),
		delay: delay,
		onComplete: function() {
			var tTime = 0.8;
			setTimeout(function() {
				LTweenLite.to(title01, tTime, {
					y: 70,
					ease: LEasing.None.easeIn(),
					loop: true
				}).to(title01, tTime, {
					y: 80,
					ease: LEasing.None.easeIn()
				});
				LTweenLite.to(title02, tTime, {
					y: 90,
					ease: LEasing.None.easeIn(),
					loop: true
				}).to(title02, tTime, {
					y: 80,
					ease: LEasing.None.easeIn()
				});
				LTweenLite.to(title03, tTime, {
					y: 70,
					ease: LEasing.None.easeIn(),
					loop: true
				}).to(title03, tTime, {
					y: 80,
					ease: LEasing.None.easeIn()
				});
				LTweenLite.to(title04, tTime, {
					y: 90,
					ease: LEasing.None.easeIn(),
					loop: true
				}).to(title04, tTime, {
					y: 80,
					ease: LEasing.None.easeIn()
				});
				var tTimes = 0.5;
				LTweenLite.to(words[0], tTimes, {
					alpha: 1,
					onComplete: function() {
						LTweenLite.to(words[1], tTimes, {
							alpha: 1,
							onComplete: function() {
								LTweenLite.to(words[2], tTimes, {
									alpha: 1,
									onComplete: function() {
										LTweenLite.to(words[3], tTimes, {
											alpha: 1,
											onComplete: function() {
												LTweenLite.to(words[4], tTimes, {
													alpha: 1,
													onComplete: function() {
														//man
														var man = new bmp(0, 0, imgList['man']);
														man.y = 908;
														man.x = rCenterWidth(man);
														homeLayer.addChild(man);
														var tmMan = new LTransitionManager(man);
														var tpMan = {
															type: LTransition.Fly,
															startPoint: 6,
															duration: 0.2,
															direction: LTransition.IN,
															easing: Strong.easeIn()
														};
														tmMan.startTransition(tpMan);
													}
												});
											}
										});
									}
								});
							}
						});
					}
				});
			}, 500);
	
		}
	});
	//logo
	var logo = new bmp(0, 1825, imgList['logo']);
	logo.x = rCenterWidth(logo);
	logo.bigAndSmall(2, 2, 2, 0.02, 0, true);
	homeLayer.addChild(logo);
	//开始游戏
	start.addEventListener(LMouseEvent.MOUSE_DOWN, function() {
		start.removeEventListener(LMouseEvent.MOUSE_DOWN);
		select();
		LTweenLite.to(homeLayer, 1.0, {
			alpha: 0,
			onComplete: function() {
				homeLayer.remove();
			}
		});
	});
	
}
//选择
function select(){
	//选择层
	var selectLayer = new LSprite();
	backLayer.addChild(selectLayer);
	selectLayer.alpha = 0;
	LTweenLite.to(selectLayer,0.5,{alpha:1.0,onComplete:function(){
		var choice01 = rBmp(imgList['choice01']); //548
		choice01.y = 88;
		choice01.x = 148;
		choice01.rotateCenter = true;
		selectLayer.addChild(choice01);
		var choice02 = rBmp(imgList['choice02']); //548
		choice02.y = 48;
		choice02.x = 423;
		choice02.rotateCenter = true;
		selectLayer.addChild(choice02);
		var choice03 = rBmp(imgList['choice03']); //548
		choice03.y = 88;
		choice03.x = 698;
		choice03.rotateCenter = true;
		selectLayer.addChild(choice03);
		var tm1 = new LTransitionManager(choice01);
		var tp1 = {
			type: LTransition.Fly,
			startPoint: 1,
			duration: 0.25,
			direction: LTransition.IN,
			easing: Strong.easeIn()
		};
		tm1.startTransition(tp1);
		var tm2 = new LTransitionManager(choice02);
		var tp2 = {
			type: LTransition.Fly,
			startPoint: 2,
			duration: 0.25,
			direction: LTransition.IN,
			easing: Strong.easeIn()
		};
		tm2.startTransition(tp2);
		var tm3 = new LTransitionManager(choice03);
		var tp3 = {
			type: LTransition.Fly,
			startPoint: 3,
			duration: 0.25,
			direction: LTransition.IN,
			easing: Strong.easeIn()
		};
		tm3.startTransition(tp3);
		setTimeout(function(){
			var tTime = 0.5;
			LTweenLite.to(choice01, tTime, {
				y: 78,
				ease: LEasing.None.easeIn(),
				loop: true
			}).to(choice01, tTime, {
				y: 88,
				ease: LEasing.None.easeIn()
			});
			LTweenLite.to(choice02, tTime, {
				y: 58,
				ease: LEasing.None.easeIn(),
				loop: true
			}).to(choice02, tTime, {
				y: 48,
				ease: LEasing.None.easeIn()
			});
			LTweenLite.to(choice03, tTime, {
				y: 78,
				ease: LEasing.None.easeIn(),
				loop: true
			}).to(choice03, tTime, {
				y: 88,
				ease: LEasing.None.easeIn()
			});
			LTweenLite.to(word,0.5,{alpha:1,onComplete:function() {
				var htime = 0.25;
				LTweenLite.to(head[0],htime,{alpha:1,onComplete:function(){
					texts[0] = new bmp(282,503,imgList['select01']);
					selectLayer.addChild(texts[0]);
					var hm1 = new LTransitionManager(texts[0]);
					var hp1 = {
						type: LTransition.Fly,
						startPoint: 1,
						duration: 0.2,
						direction: LTransition.IN,
						easing: Strong.easeIn()
					};
					
					hm1.startTransition(hp1);
					LTweenLite.to(head[1], htime, {
						alpha: 1,
						onComplete: function() {
							texts[1] = new bmp(600, 503, imgList['select02']);
							selectLayer.addChild(texts[1]);
							var hm2 = new LTransitionManager(texts[1]);
							var hp2 = {
								type: LTransition.Fly,
								startPoint: 3,
								duration: 0.2,
								direction: LTransition.IN,
								easing: Strong.easeIn()
							};
							hm2.startTransition(hp2);
							LTweenLite.to(head[2], htime, {
								alpha: 1,
								onComplete: function() {
									texts[2] = new bmp(282,1614, imgList['select03']);
									selectLayer.addChild(texts[2]);
									var hm3 = new LTransitionManager(texts[2]);
									var hp3 = {
										type: LTransition.Fly,
										startPoint: 7,
										duration: 0.2,
										direction: LTransition.IN,
										easing: Strong.easeIn()
									};
									hm3.startTransition(hp3);
									LTweenLite.to(head[3], htime, {
										alpha: 1,
										onComplete: function() {
											texts[3] = new bmp(600,1614, imgList['select04']);
											selectLayer.addChild(texts[3]);
											var hm4 = new LTransitionManager(texts[3]);
											var hp4 = {
												type: LTransition.Fly,
												startPoint: 9,
												duration: 0.2,
												direction: LTransition.IN,
												easing: Strong.easeIn()
											};
											hm4.startTransition(hp4);
											setTimeout(function(){
												texts[0].bigAndSmall(2, 2, 1, 0.06, 0, true);
												texts[1].bigAndSmall(2, 2, 1, 0.06, 0, true);
												texts[2].bigAndSmall(2, 2, 1, 0.06, 0, true);
												texts[3].bigAndSmall(2, 2, 1, 0.06, 0, true);
												var isChoice = false;
												choiceLayer[0] = new LSprite();
												choiceLayer[0].graphics.drawRect(0, '#000000', [130, 438, 400, 640], false, '#000000');
												selectLayer.addChild(choiceLayer[0]);
												choiceLayer[0].addEventListener(LMouseEvent.MOUSE_DOWN,function(){
													choiceLayer[0].removeEventListener(LMouseEvent.MOUSE_DOWN);
													if(isChoice==false){
														isChoice=true;
														choiceType = 0;
														LTweenLite.to(selectLayer, 1.0, {
															alpha: 0,
															onComplete: function() {
																selectLayer.remove();
															}
														});
														problem(0,0,1);
													}
												});
												choiceLayer[1] = new LSprite();
												choiceLayer[1].graphics.drawRect(0, '#000000', [550, 438, 400, 640], false, '#000000');
												selectLayer.addChild(choiceLayer[1]);
												choiceLayer[1].addEventListener(LMouseEvent.MOUSE_DOWN,function(){
													choiceLayer[1].removeEventListener(LMouseEvent.MOUSE_DOWN);
													if(isChoice==false){
														isChoice=true;
														choiceType = 1;
														LTweenLite.to(selectLayer, 1.0, {
															alpha: 0,
															onComplete: function() {
																selectLayer.remove();
															}
														});
														problem(0,0,1);
													}
												});
												choiceLayer[2] = new LSprite();
												choiceLayer[2].graphics.drawRect(0, '#000000', [130, 1100, 400, 640], false, '#000000');
												selectLayer.addChild(choiceLayer[2]);
												choiceLayer[2].addEventListener(LMouseEvent.MOUSE_DOWN,function(){
													choiceLayer[2].removeEventListener(LMouseEvent.MOUSE_DOWN);
													if(isChoice==false){
														isChoice=true;
														choiceType = 2;
														LTweenLite.to(selectLayer, 1.0, {
															alpha: 0,
															onComplete: function() {
																selectLayer.remove();
															}
														});
														problem(0,0,1);
													}
												});
												choiceLayer[3] = new LSprite();
												choiceLayer[3].graphics.drawRect(0, '#000000', [550, 1100, 400, 640], false, '#000000');
												selectLayer.addChild(choiceLayer[3]);
												choiceLayer[3].addEventListener(LMouseEvent.MOUSE_DOWN,function(){
													choiceLayer[3].removeEventListener(LMouseEvent.MOUSE_DOWN);
													if(isChoice==false){
														isChoice=true;
														choiceType = 3;
														LTweenLite.to(selectLayer, 1.0, {
															alpha: 0,
															onComplete: function() {
																selectLayer.remove();
															}
														});
														problem(0,0,1);
													}
												});
											},500);
										}
									});
								}
							});
						}
					});
				}});
			}});
		},500);
		
	}});
	//背景图片
	var back = new bmp(0,0,imgList['select']);
	selectLayer.addChild(back);	
	//云
	var sky = new bmp(0, 320, imgList['sky']);
	sky.x = rCenterWidth(sky);
	sky.bigAndSmall(2, 2, 2, 0.02, 0, true);
	selectLayer.addChild(sky);
	//logo
	var logo = new bmp(0, 1825, imgList['logo']);
	logo.x = rCenterWidth(logo);
	logo.bigAndSmall(2, 2, 2, 0.05, 0, true);
	selectLayer.addChild(logo);
	var word = new setWrapText(0, 325,60, "匹配专属春联", '#ffc727', false, 420, false, 48, 3, 'zcool');
	word.x = rCenterWidth(word);
	word.alpha = 0;
	selectLayer.addChild(word);
	//头像
	var head = [];
	for(var i=0;i<4;i++)
	{
		if(i%2==0)
		{
			head[i] = new bmp(153,620+parseInt(i/2)*600,imgList['head0'+(i+1)]);
			selectLayer.addChild(head[i]);
		}else{
			head[i] = new bmp(153+422,620+parseInt(i/2)*600,imgList['head0'+(i+1)]);
			selectLayer.addChild(head[i]);
		}
		head[i].alpha = 0;
	}
	var texts = [];
	var choiceLayer = [];
	
}
//问题
function problem(randow,sort,time){
	//选择层	
	
	var proLayer = new LSprite();
	backLayer.addChild(proLayer);
	proLayer.alpha = 0;
	var qst = new question(168.5,1003,questions[choiceType*2+randow]);
	qst.alpha = 0;
	proLayer.addChild(qst);
	LTweenLite.to(proLayer,1.0,{alpha:1.0,onComplete:function(){
		var choice01 = rBmp(imgList['choice01']); //548
		choice01.y = 88;
		choice01.x = 148;
		choice01.rotateCenter = true;
		proLayer.addChild(choice01);
		var choice02 = rBmp(imgList['choice04']); //548
		choice02.y = 48;
		choice02.x = 423;
		choice02.rotateCenter = true;
		proLayer.addChild(choice02);
		var choice03 = rBmp(imgList['choice05']); //548
		choice03.y = 88;
		choice03.x = 698;
		choice03.rotateCenter = true;
		proLayer.addChild(choice03);
		var tm1 = new LTransitionManager(choice01);
		var tp1 = {
			type: LTransition.Fly,
			startPoint: 1,
			duration: 0.25,
			direction: LTransition.IN,
			easing: Strong.easeIn()
		};
		tm1.startTransition(tp1);
		var tm2 = new LTransitionManager(choice02);
		var tp2 = {
			type: LTransition.Fly,
			startPoint: 2,
			duration: 0.25,
			direction: LTransition.IN,
			easing: Strong.easeIn()
		};
		tm2.startTransition(tp2);
		var tm3 = new LTransitionManager(choice03);
		var tp3 = {
			type: LTransition.Fly,
			startPoint: 3,
			duration: 0.25,
			direction: LTransition.IN,
			easing: Strong.easeIn()
		};
		tm3.startTransition(tp3);
		setTimeout(function(){
			var tTime = 0.8;
			LTweenLite.to(choice01, tTime, {
				y: 78,
				ease: LEasing.None.easeIn(),
				loop: true
			}).to(choice01, tTime, {
				y: 88,
				ease: LEasing.None.easeIn()
			});
			LTweenLite.to(choice02, tTime, {
				y: 58,
				ease: LEasing.None.easeIn(),
				loop: true
			}).to(choice02, tTime, {
				y: 48,
				ease: LEasing.None.easeIn()
			});
			LTweenLite.to(choice03, tTime, {
				y: 78,
				ease: LEasing.None.easeIn(),
				loop: true
			}).to(choice03, tTime, {
				y: 88,
				ease: LEasing.None.easeIn()
			});
			LTweenLite.to(word,1.0,{alpha:1,onComplete:function() {
				//两个公仔
				var man2 = rBmp(imgList['man2']);
				man2.x = 565;
				man2.y = 465;
				proLayer.addChild(man2);
				var man1 = rBmp(imgList['man1']);
				man1.x = 262;
				man1.y = 605;
				proLayer.addChild(man1);
				var mm1 = new LTransitionManager(man1);
				var mp1 = {
					type: LTransition.Fly,
					startPoint: 7,
					duration: 0.25,
					direction: LTransition.IN,
					easing: Strong.easeIn()
				};
				mm1.startTransition(mp1);
				
				var mm2 = new LTransitionManager(man2);
				var mp2 = {
					type: LTransition.Fly,
					startPoint: 3,
					duration: 0.25,
					direction: LTransition.IN,
					easing: Strong.easeIn()
				};
				mm2.startTransition(mp2);
				setTimeout(function(){
					var maskObj = new LSprite();
				    maskObj.graphics.drawRect(0, "#ff0000", [262, 606, 400, 400]);
				    man1.mask = maskObj;
					qst.alpha = 1;
					left.alpha = 1;
					right.alpha = 1;
					LTweenLite.to(left,0.4,{x:128});
					LTweenLite.to(right,0.35,{x:895});
					LTweenLite.to(yLeft,0.4,{x:128-yLeft.getWidth()});
					LTweenLite.to(yRight,0.6,{x:895+yRight.getWidth(),onComplete:function(){
						LTweenLite.to(answers[0],0.5,{alpha:1,onComplete:function(){
							LTweenLite.to(answers[1],0.5,{alpha:1,onComplete:function(){
								LTweenLite.to(answers[2],0.5,{alpha:1,onComplete:function(){
									var an = [];
									an[0] = new LSprite();
									an[1] = new LSprite();
									an[2] = new LSprite();
									an[0].graphics.drawRect(0, "#ff0000", [223,1255,633,144],false,"rgba(0,0,0,0.5)");
									an[0].addEventListener(LMouseEvent.MOUSE_DOWN,function(){
										an[0].removeEventListener(LMouseEvent.MOUSE_DOWN);
										if(sort==0)
										{
											qst.changeTitle(questions[choiceType*2+1])
											proLayer.addChild(qst);
											answers[0].remove();
											answers[1].remove();
											answers[2].remove();
											answers[0] = new answer(223,1255,problem1[choiceType*2+1]);
											answers[1] = new answer(223,1425,problem2[choiceType*2+1]);
											answers[2] = new answer(223,1595,problem3[choiceType*2+1]);
											answers[0].alpha = 0;
											answers[1].alpha = 0;
											answers[2].alpha = 0;
											proLayer.addChild(answers[0]);
											proLayer.addChild(answers[1]);
											proLayer.addChild(answers[2]);
											LTweenLite.to(answers[0],0.5,{delay:0.5,alpha:1,onComplete:function(){
												LTweenLite.to(answers[1],0.5,{alpha:2,onComplete:function(){
													LTweenLite.to(answers[2],0.5,{alpha:3,onComplete:function(){
														an[0].graphics.drawRect(0, "#ff0000", [223,1255,633,144],false,"rgba(0,0,0,0.5)");
														an[0].addEventListener(LMouseEvent.MOUSE_DOWN,function(){
															LTweenLite.to(proLayer,1.0,{alpha:0,onComplete:function(){
																proLayer.remove();
															}});
															couplet();
														});
														an[1].graphics.drawRect(0, "#ff0000", [223,1255,633,144],false,"rgba(0,0,0,0.5)");
														an[1].addEventListener(LMouseEvent.MOUSE_DOWN,function(){
															LTweenLite.to(proLayer,1.0,{alpha:0,onComplete:function(){
																proLayer.remove();
															}});
															couplet();
														});
														an[2].graphics.drawRect(0, "#ff0000", [223,1255,633,144],false,"rgba(0,0,0,0.5)");
														an[2].addEventListener(LMouseEvent.MOUSE_DOWN,function(){
															LTweenLite.to(proLayer,1.0,{alpha:0,onComplete:function(){
																proLayer.remove();
															}});
															couplet();
														});
													}});
												}});
											}});
										}else{
											LTweenLite.to(proLayer,1.0,{alpha:0,onComplete:function(){
												proLayer.remove();
											}});
											couplet();
										}
										
									});
									proLayer.addChild(an[0]);
									an[1].graphics.drawRect(0, "#ff0000", [223,1425,633,144],false,"rgba(0,0,0,0.5)");
									an[1].addEventListener(LMouseEvent.MOUSE_DOWN,function(){
										an[1].removeEventListener(LMouseEvent.MOUSE_DOWN);
										if(sort==0)
										{
											qst.changeTitle(questions[choiceType*2+1])
											proLayer.addChild(qst);
											answers[0].remove();
											answers[1].remove();
											answers[2].remove();
											answers[0] = new answer(223,1255,problem1[choiceType*2+1]);
											answers[1] = new answer(223,1425,problem2[choiceType*2+1]);
											answers[2] = new answer(223,1595,problem3[choiceType*2+1]);
											answers[0].alpha = 0;
											answers[1].alpha = 0;
											answers[2].alpha = 0;
											proLayer.addChild(answers[0]);
											proLayer.addChild(answers[1]);
											proLayer.addChild(answers[2]);
											LTweenLite.to(answers[0],0.5,{delay:0.5,alpha:1,onComplete:function(){
												LTweenLite.to(answers[1],0.5,{alpha:2,onComplete:function(){
													LTweenLite.to(answers[2],0.5,{alpha:3,onComplete:function(){
														an[0].graphics.drawRect(0, "#ff0000", [223,1255,633,144],false,"rgba(0,0,0,0.5)");
														an[0].addEventListener(LMouseEvent.MOUSE_DOWN,function(){
															LTweenLite.to(proLayer,1.0,{alpha:0,onComplete:function(){
																proLayer.remove();
															}});
															couplet();
														});
														an[1].graphics.drawRect(0, "#ff0000", [223,1255,633,144],false,"rgba(0,0,0,0.5)");
														an[1].addEventListener(LMouseEvent.MOUSE_DOWN,function(){
															LTweenLite.to(proLayer,1.0,{alpha:0,onComplete:function(){
																proLayer.remove();
															}});
															couplet();
														});
														an[2].graphics.drawRect(0, "#ff0000", [223,1255,633,144],false,"rgba(0,0,0,0.5)");
														an[2].addEventListener(LMouseEvent.MOUSE_DOWN,function(){
															LTweenLite.to(proLayer,1.0,{alpha:0,onComplete:function(){
																proLayer.remove();
															}});
															couplet();
														});
													}});
												}});
											}});
										}else{
											LTweenLite.to(proLayer,1.0,{alpha:0,onComplete:function(){
												proLayer.remove();
											}});
											couplet();
										}
									});
									proLayer.addChild(an[1]);
									an[2].graphics.drawRect(0, "#ff0000", [223,1595,633,144],false,"rgba(0,0,0,0.5)");
									proLayer.addChild(an[2]);
									an[2].addEventListener(LMouseEvent.MOUSE_DOWN,function(){
										an[2].removeEventListener(LMouseEvent.MOUSE_DOWN);
										if(sort==0)
										{
											qst.changeTitle(questions[choiceType*2+1])
											proLayer.addChild(qst);
											answers[0].remove();
											answers[1].remove();
											answers[2].remove();
											answers[0] = new answer(223,1255,problem1[choiceType*2+1]);
											answers[1] = new answer(223,1425,problem2[choiceType*2+1]);
											answers[2] = new answer(223,1595,problem3[choiceType*2+1]);
											answers[0].alpha = 0;
											answers[1].alpha = 0;
											answers[2].alpha = 0;
											proLayer.addChild(answers[0]);
											proLayer.addChild(answers[1]);
											proLayer.addChild(answers[2]);
											LTweenLite.to(answers[0],0.5,{delay:0.5,alpha:1,onComplete:function(){
												LTweenLite.to(answers[1],0.5,{alpha:2,onComplete:function(){
													LTweenLite.to(answers[2],0.5,{alpha:3,onComplete:function(){
														an[0].graphics.drawRect(0, "#ff0000", [223,1255,633,144],false,"rgba(0,0,0,0.5)");
														an[0].addEventListener(LMouseEvent.MOUSE_DOWN,function(){
															LTweenLite.to(proLayer,1.0,{alpha:0,onComplete:function(){
																proLayer.remove();
															}});
															couplet();
														});
														an[1].graphics.drawRect(0, "#ff0000", [223,1255,633,144],false,"rgba(0,0,0,0.5)");
														an[1].addEventListener(LMouseEvent.MOUSE_DOWN,function(){
															LTweenLite.to(proLayer,1.0,{alpha:0,onComplete:function(){
																proLayer.remove();
															}});
															couplet();
														});
														an[2].graphics.drawRect(0, "#ff0000", [223,1255,633,144],false,"rgba(0,0,0,0.5)");
														an[2].addEventListener(LMouseEvent.MOUSE_DOWN,function(){
															LTweenLite.to(proLayer,1.0,{alpha:0,onComplete:function(){
																proLayer.remove();
															}});
															couplet();
														});
													}});
												}});
											}});
										}else{
											LTweenLite.to(proLayer,1.0,{alpha:0,onComplete:function(){
												proLayer.remove();
											}});
											couplet();
										}
									});
								}});
							}});
						}});
					}});
				},1000);
			}});
		},500);
		
	}});
	var yLeft = new bmp(168.5,997,imgList['yLeft']);
	proLayer.addChild(yLeft);
	var yRight = new bmp(537,997,imgList['yRight']);
	proLayer.addChild(yRight);
	//背景图片
	var back = new bmp(0,0,imgList['pBkg']);
	proLayer.addChild(back);	
	//灯笼
	var lantern1 = new bmp(45, 460, imgList['lantern1']);
	lantern1.rotateCenter = false;
	proLayer.addChild(lantern1);
	LTweenLite.to(lantern1, 1, {
		rotate: 5,
		loop: true,
		ease: LEasing.None.easeIn()
	}).to(lantern1, 1, {
		rotate: 0,
		ease: LEasing.None.easeIn()
	});
	var lantern2 = new bmp(135, 430, imgList['lantern2']);
	lantern2.rotateCenter = false;
	proLayer.addChild(lantern2);
	LTweenLite.to(lantern2, 1.2, {
		rotate: -5,
		loop: true,
		ease: LEasing.None.easeIn()
	}).to(lantern2, 1.2, {
		rotate: 0,
		ease: LEasing.None.easeIn()
	});
	//云
	var sky = new bmp(0, 320, imgList['sky']);
	sky.x = rCenterWidth(sky);
	sky.bigAndSmall(2, 2, 2, 0.02, 0, true);
	proLayer.addChild(sky);
	//logo
	var logo = new bmp(0, 1825, imgList['logo']);
	logo.x = rCenterWidth(logo);
	logo.bigAndSmall(2, 2, 2, 0.05, 0, true);
	proLayer.addChild(logo);
	var word = new setWrapText(0, 320,68, "狗年大吉", '#ffc727', false, 420, false, 48, 3, 'zcool');
	word.x = rCenterWidth(word);
	word.alpha = 0;
	proLayer.addChild(word);
	
	var answers = [];
	answers[0] = new answer(223,1255,problem1[choiceType*2+randow]);
	answers[1] = new answer(223,1425,problem2[choiceType*2+randow]);
	answers[2] = new answer(223,1595,problem3[choiceType*2+randow]);
	answers[0].alpha = 0;
	answers[1].alpha = 0;
	answers[2].alpha = 0;
	proLayer.addChild(answers[0]);
	proLayer.addChild(answers[1]);
	proLayer.addChild(answers[2]);

	var left = new bmp(0,976,imgList['problem']);
	left.x = 571-left.getWidth();
	proLayer.addChild(left);
	var right = new bmp(0,976,imgList['problem']);
	right.x = 571;
	proLayer.addChild(right);
	left.alpha = 0;
	right.alpha = 0;
}//
function couplet(){
	var cLayer = new LSprite();
	cLayer.alpha = 0;
	backLayer.addChild(cLayer);
	//背景图片
	var back = new bmp(0,0,imgList['couple']);
	cLayer.addChild(back);
	//云
	var sky = new bmp(0, 240, imgList['bigSky']);
	sky.x = rCenterWidth(sky);
	sky.bigAndSmall(2, 2, 2, 0.02, 0, true);
	cLayer.addChild(sky);
	//logo
	var logo = new bmp(0, 1825, imgList['logo']);
	logo.x = rCenterWidth(logo);
	logo.bigAndSmall(2, 2, 2, 0.05, 0, true);
	cLayer.addChild(logo);
	//文案
	var word = new bmp(0,612,imgList['word']);
	word.x = rCenterWidth(word);
	word.alpha = 0;
	cLayer.addChild(word);
	//刷子
	var brush = rBmp(imgList['brush']);
	brush.x = 300;
	brush.y = 1280;
	brush.alpha = 0;
	var brushTween = LTweenLite.to(brush,0.4,{rotate:-30,loop:true}).to(brush,0.4,{rotate:0});
	cLayer.addChild(brush);
	
	var belong01 = new bmp(112,105,imgList['belong01']);
	cLayer.addChild(belong01);
	var belong02 = new bmp(324,105,imgList['belong02']);
	cLayer.addChild(belong02);
	var belong03 = new bmp(536,105,imgList['belong03']);
	cLayer.addChild(belong03);
	var belong04 = new bmp(748,105,imgList['belong04']);
	cLayer.addChild(belong04);
	var tTime = 0.8;
	LTweenLite.to(belong01, tTime, {
		y: 115,
		ease: LEasing.None.easeIn(),
		loop: true
	}).to(belong01, tTime, {
		y: 105,
		ease: LEasing.None.easeIn()
	});
	LTweenLite.to(belong02, tTime, {
		y: 95,
		ease: LEasing.None.easeIn(),
		loop: true
	}).to(belong02, tTime, {
		y: 105,
		ease: LEasing.None.easeIn()
	});
	LTweenLite.to(belong03, tTime, {
		y: 115,
		ease: LEasing.None.easeIn(),
		loop: true
	}).to(belong03, tTime, {
		y: 105,
		ease: LEasing.None.easeIn()
	});
	LTweenLite.to(belong04, tTime, {
		y: 95,
		ease: LEasing.None.easeIn(),
		loop: true
	}).to(belong04, tTime, {
		y: 115,
		ease: LEasing.None.easeIn()
	});
	
	
	LTweenLite.to(cLayer,1.0,{alpha:1.0,onComplete:function(){
		LTweenLite.to(word,1.0,{alpha:1.0,onComplete:function(){
			LTweenLite.to(brush,1.0,{alpha:1.0,onComplete:function(){
				var brushLayer = new LSprite();
				brushLayer.graphics.drawRect(0, "#ff0000", [320, 1300, 340, 300],false,"#000000");
				cLayer.addChild(brushLayer);
				
				var hand = new bmp(380,1560,imgList['hand']);
				cLayer.addChild(hand);
				var handTween = LTweenLite.to(hand,0.6,{alpha:0,loop:true,y:1480,onComplete:function(){
					hand.alpha = 1;
					hand.y = 1560;
				}});
				brushLayer.addEventListener(LMouseEvent.MOUSE_DOWN,function(){
					brushLayer.removeEventListener(LMouseEvent.MOUSE_DOWN);
						LTweenLite.to(cLayer,1.0,{alpha:0,onComplete:function(){
							cLayer.remove();
						}});
						showCouplet();
				});
			}});
		}});
	}});
	
	
}
//显示红包
function showRed(){
	var showLayer = new LSprite();
	showLayer.alpha = 0;
	backLayer.addChild(showLayer);
	//背景图片
	var back = new bmp(0,0,imgList['red']);
	showLayer.addChild(back);
	//灯笼
	var lantern1 = new bmp(420, 130, imgList['lantern1']);
	lantern1.rotateCenter = false;
	showLayer.addChild(lantern1);
	LTweenLite.to(lantern1, 1, {
		rotate: 5,
		loop: true,
		ease: LEasing.None.easeIn()
	}).to(lantern1, 1, {
		rotate: 0,
		ease: LEasing.None.easeIn()
	});
	var lantern2 = new bmp(515, 130, imgList['lantern2']);
	lantern2.rotateCenter = false;
	showLayer.addChild(lantern2);
	LTweenLite.to(lantern2, 1.2, {
		rotate: -5,
		loop: true,
		ease: LEasing.None.easeIn()
	}).to(lantern2, 1.2, {
		rotate: 0,
		ease: LEasing.None.easeIn()
	});
	//云
	var littleSky = new bmp(0, 170, imgList['littleSky']);
	littleSky.x = rCenterWidth(littleSky);
	littleSky.bigAndSmall(2, 2, 2, 0.02, 0, true);
	showLayer.addChild(littleSky);
	//logo
	var logo = new bmp(0, 1825, imgList['logo']);
	logo.x = rCenterWidth(logo);
	logo.bigAndSmall(2, 2, 2, 0.02, 0, true);
	showLayer.addChild(logo);
	//打开红包
	var redBox = new bmp(0, 690, imgList['redBox']);
	redBox.x = rCenterWidth(redBox);
	showLayer.addChild(redBox);
	var textBox = new bmp(0, 397, imgList['textBox']);
	textBox.x = rCenterWidth(textBox);
	showLayer.addChild(textBox);
	//打开红包
	var money = rBmp(imgList['money']);
	money.x = rCenterWidth(money);
	money.y = 1186;
	showLayer.addChild(money);
	//打开红包
	var open = new LSprite();
	open.graphics.drawRect(0, "#ff0000", [0,690,redBox.getWidth(), redBox.getHeight()],false,"rgba(0,0,0,0.5)");
	open.x = rCenterWidth(open);
	showLayer.addChild(open);
	
	//textBox
	var openRed =  new btn(0, 1600, imgList['open']);
	openRed.x = rCenterWidth(openRed);
	showLayer.addChild(openRed);
	//logo
	var redWord1 = new setWrapText(0, 434,56,"环保枪纸胶，", '#440404', false, 420, false, 48, 3, 'happy');
	redWord1.x = rCenterWidth(redWord1);
	redWord1.alpha = 0;
	showLayer.addChild(redWord1);
	var redWord2 = new setWrapText(0, 507,56,"就选嘉力丰！", '#440404', false, 420, false, 48, 3, 'happy');
	redWord2.x = rCenterWidth(redWord2);
	redWord2.alpha = 0;
	showLayer.addChild(redWord2);
	var redWord3 = new setWrapText(0, 580,56,"嘉力丰给您拜早年啦！", '#440404', false, 420, false, 48, 3, 'happy');
	redWord3.x = rCenterWidth(redWord3);
	redWord3.alpha = 0;
	showLayer.addChild(redWord3);
	LTweenLite.to(showLayer,1.0,{alpha:1,onComplete:function(){
		LTweenLite.to(redWord1,1.0,{alpha:1});
		LTweenLite.to(redWord2,1.0,{alpha:1});
		LTweenLite.to(redWord3,1.0,{alpha:1});
	}});
	//红包提示
	var openStatus = true;
	openRed.addEventListener(LMouseEvent.MOUSE_DOWN,function(){
		if(openStatus==true)
		{
			openStatus = false;
			opening();
		}
	});
	open.addEventListener(LMouseEvent.MOUSE_DOWN,function(){
		if(openStatus==true)
		{
			openStatus = false;
			opening();
		}
	});
	function opening(){
		LTweenLite.to(money,0.25,{rotate:360,loop:true,onComplete:function(){
			money.rotate = 0;
		}});
		setTimeout(function(){
			$.get('json/money.json', function(data) {
				if(data.num == 2) {
					$('#img').show();
					$('#img').animate({'opacity':1},500);
					return false;	
				}
			});
			$.get('json/money.json', function(data) {
				if(data.status == true) {
					getRed();
				} else {
					open.visible = false;
					money.visible = false;
					redBox.visible = false;
					textBox.visible = false;
					redWord.visible = false;
					var num = parseInt(Math.random()*5)+1;
					var happiness = new bmp(0, 378, imgList['happiness'+num]);
					happiness.x = rCenterWidth(happiness);
					happiness.alpha = 0;
					showLayer.addChild(happiness);
					LTweenLite.to(happiness, 1.0, {
						alpha: 1
					});
					var tryLayer = new LSprite();
					tryLayer.graphics.drawRect(0, "#ff0000", [234, 1585, 611, 120], true, "rgba(0,0,0,0)");
					showLayer.addChild(tryLayer);
					tryLayer.addEventListener(LMouseEvent.MOUSE_DOWN, function() {
						showLayer.removeAllChild();
						showLayer.die();
						showRed();
					});
				}
			});
		},500);
	}
	

}
//获得红包页面
function getRed(){
	var getLayer = new LSprite();
	getLayer.graphics.drawRect(0, "#ff0000", [0,0,LGlobal.width, LGlobal.height],true,"rgba(0,0,0,0.5)");
	getLayer.addEventListener(LMouseEvent.MOUSE_DOWN,setNull);
	//
	var wordLayer = new LSprite();
	wordLayer.graphics.drawRect(0, "#ff0000", [0,0,LGlobal.width, LGlobal.height],true,"rgba(0,0,0,0.5)");
	getLayer.addChild(wordLayer);
	//红包背景
	var getRed = new bmp(0, 300, imgList['getRed']);
	getRed.x = rCenterWidth(getRed);
	wordLayer.addChild(getRed);
	//打开红包
	var star = new bmp(0, 67, imgList['star']);
	star.x = rCenterWidth(star);
	getLayer.addChild(star);
	star.bling(0.5,0.6,0.8,true);
	backLayer.addChild(getLayer);
	
	var words = [];
	words[0] = new setWrapText(0, 366,50,"恭喜老铁，", '#ffc223', false, 420, false, 48, 3, 'happy');
	words[0].x = rCenterWidth(words[0]);
	wordLayer.addChild(words[0]);
	words[1] = new setWrapText(0, 438,50,"嘉力丰给你塞了个", '#ffc223', false, 420, false, 48, 3, 'happy');
	words[1].x = rCenterWidth(words[1]);
	wordLayer.addChild(words[1]);
	
	//请求获得数据
	$.get('json/money.json',function(data){
		words[2] = new setWrapText(0, 518,50,data.money+"元的红包！", '#ffc223', false, 420, false, 48, 3, 'happy');
		words[2].x = rCenterWidth(words[2]);
		wordLayer.addChild(words[2]);
		words[3] = new setWrapText(0, 1060,240,data.money+"元", '#ffc223', false, 420, false, 48, 3, 'zcool');
		setTimeout(function(){
			words[3].x = rCenterWidth(words[3]);
		},100);
		wordLayer.addChild(words[3]);
		var x1 = wordLayer.x;
		var y1 = wordLayer.y;
		wordLayer.scaleX = 1.5;
		wordLayer.scaleY = 1.5;
		wordLayer.x = rCenterWidth(wordLayer);
		wordLayer.y = rCenterHeight(wordLayer);
		var x12 = wordLayer.x;
		var y12 = wordLayer.y;
		wordLayer.scaleX = 0.1;
		wordLayer.scaleY = 0.1;
		wordLayer.x = rCenterWidth(wordLayer);
		wordLayer.y = rCenterHeight(wordLayer);
		LTweenLite.to(wordLayer,0.2,{scaleX:1.5,scaleY:1.5,x:x12,y:y12}).to(wordLayer,0.1,{scaleX:1,scaleY:1,x:x1,y:y1});
		var now = new btn(0, 1480, imgList['now']);
		now.x = 158;
		wordLayer.addChild(now);
		now.addEventListener(LMouseEvent.MOUSE_DOWN,function(){
			now.removeEventListener(LMouseEvent.MOUSE_DOWN);
				var popLayer = new LSprite();
				popLayer.graphics.drawRect(0, "#ff0000", [0,0,LGlobal.width, LGlobal.height],true,"rgba(0,0,0,0.5)");
				getLayer.addChild(popLayer);
				var pop = new bmp(0, 1825, imgList['pop']);
				pop.x = rCenterWidth(pop);
				pop.y = rCenterHeight(pop);
				popLayer.addChild(pop);
				popLayer.addEventListener(LMouseEvent.MOUSE_DOWN,function(){
					popLayer.remove();
				});
//			$('#img').show();
//			$('#img').animate({'opacity':1},500);
		});
		var share = new btn(0, 1480, imgList['share']);
		share.x = 556;
		wordLayer.addChild(share);
		share.addEventListener(LMouseEvent.MOUSE_DOWN,function(){
			window.location.href = 'share.html';
		});
	})
	//logo
	var logo = new bmp(0, 1825, imgList['logo']);
	logo.x = rCenterWidth(logo);
	logo.bigAndSmall(2, 2, 2, 0.02, 0, true);
	getLayer.addChild(logo);
}
