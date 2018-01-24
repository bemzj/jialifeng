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
    LLoadManage.load(loadImg,'',loadImging);
}
//预加载页面
function loadImging(result){
	LLoadManage.load(gameImg,loadProgress,startGame);
}
//加载函数
function loadProgress(pre){
	console.log(pre);
}
//游戏开始
function startGame(result){
	imgList=result;
//	homepage();
	select();
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
	var title02 = rBmp(imgList['title02']); //318
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
	var title03 = rBmp(imgList['title03']); //548
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
	var title04 = rBmp(imgList['title04']); //778
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
	LTweenLite.to(selectLayer,1.0,{alpha:1.0,onComplete:function(){
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
				var htime = 1.0;
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
													if(isChoice==false){
														isChoice=true;
														choiceType = 0;
														LTweenLite.to(selectLayer, 1.0, {
															alpha: 0,
															onComplete: function() {
																selectLayer.remove();
															}
														});
													}
												});
												choiceLayer[1] = new LSprite();
												choiceLayer[1].graphics.drawRect(0, '#000000', [550, 438, 400, 640], false, '#000000');
												selectLayer.addChild(choiceLayer[1]);
												choiceLayer[1].addEventListener(LMouseEvent.MOUSE_DOWN,function(){
													if(isChoice==false){
														isChoice=true;
														choiceType = 1;
														LTweenLite.to(selectLayer, 1.0, {
															alpha: 0,
															onComplete: function() {
																selectLayer.remove();
															}
														});
													}
												});
												choiceLayer[2] = new LSprite();
												choiceLayer[2].graphics.drawRect(0, '#000000', [130, 1100, 400, 640], false, '#000000');
												selectLayer.addChild(choiceLayer[2]);
												choiceLayer[2].addEventListener(LMouseEvent.MOUSE_DOWN,function(){
													if(isChoice==false){
														isChoice=true;
														choiceType = 2;
														LTweenLite.to(selectLayer, 1.0, {
															alpha: 0,
															onComplete: function() {
																selectLayer.remove();
															}
														});
													}
												});
												choiceLayer[3] = new LSprite();
												choiceLayer[3].graphics.drawRect(0, '#000000', [550, 1100, 400, 640], false, '#000000');
												selectLayer.addChild(choiceLayer[3]);
												choiceLayer[3].addEventListener(LMouseEvent.MOUSE_DOWN,function(){
													if(isChoice==false){
														isChoice=true;
														choiceType = 3;
														LTweenLite.to(selectLayer, 1.0, {
															alpha: 0,
															onComplete: function() {
																selectLayer.remove();
															}
														});
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
