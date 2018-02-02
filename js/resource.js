//加载页面的图片
var loadImg = [];
//加载的图片的资源
var gameImg = [
	{path:'img/index.jpg',type:'img',name:'index'},//首页背景
	{path:'img/lantern1.png',type:'img',name:'lantern1'},//灯笼
	{path:'img/lantern2.png',type:'img',name:'lantern2'},//灯笼
	{path:'img/logo.png',type:'img',name:'logo'},//logo
	{path:'img/sky.png',type:'img',name:'sky'},//云
	{path:'img/bigSky.png',type:'img',name:'bigSky'},//云
	{path:'img/start.png',type:'img',name:'start'},//开始游戏
	{path:'img/top.png',type:'img',name:'top'},//顶部
	{path:'img/man.png',type:'img',name:'man'},//man
	{path:'img/man1.png',type:'img',name:'man1'},//man1
	{path:'img/man2.png',type:'img',name:'man2'},//man2
	{path:'img/bottom.png',type:'img',name:'bottom'},//底部
	{path:'img/title01.png',type:'img',name:'title01'},//标题01
	{path:'img/title02.png',type:'img',name:'title02'},//标题02
	{path:'img/title03.png',type:'img',name:'title03'},//标题03
	{path:'img/title04.png',type:'img',name:'title04'},//标题04
	{path:'img/select.jpg',type:'img',name:'select'},//背景
	{path:'img/choice01.png',type:'img',name:'choice01'},//选
	{path:'img/choice02.png',type:'img',name:'choice02'},//角
	{path:'img/choice03.png',type:'img',name:'choice03'},//色
	{path:'img/choice04.png',type:'img',name:'choice04'},//择
	{path:'img/choice05.png',type:'img',name:'choice05'},//题
	{path:'img/head01.png',type:'img',name:'head01'},//头像01
	{path:'img/head02.png',type:'img',name:'head02'},//头像02
	{path:'img/head03.png',type:'img',name:'head03'},//头像03
	{path:'img/head04.png',type:'img',name:'head04'},//头像04
	{path:'img/select01.png',type:'img',name:'select01'},//头像01
	{path:'img/select02.png',type:'img',name:'select02'},//头像02
	{path:'img/select03.png',type:'img',name:'select03'},//头像03
	{path:'img/select04.png',type:'img',name:'select04'},//头像04
	{path:'img/pBkg.png',type:'img',name:'pBkg'},//背景
	{path:'img/yLeft.jpg',type:'img',name:'yLeft'},//左
	{path:'img/yRight.jpg',type:'img',name:'yRight'},//右
	{path:'img/titleBkg.jpg',type:'img',name:'titleBkg'},//题目背景
	{path:'img/answer.png',type:'img',name:'answer'},//答案背景
	{path:'img/problem.png',type:'img',name:'problem'},//杠
	{path:'img/couple.jpg',type:'img',name:'couple'},//杠
	{path:'img/belong01.png',type:'img',name:'belong01'},//专属春联
	{path:'img/belong02.png',type:'img',name:'belong02'},//
	{path:'img/belong03.png',type:'img',name:'belong03'},//
	{path:'img/belong04.png',type:'img',name:'belong04'},//
	{path:'img/word.png',type:'img',name:'word'},//文案
	{path:'img/brush.png',type:'img',name:'brush'},//刷子
	{path:'img/reel01.png',type:'img',name:'reel01'},//卷轴
	{path:'img/reel02.png',type:'img',name:'reel02'},//卷轴
	{path:'img/btn01.png',type:'img',name:'btn01'},//按钮01
	{path:'img/rice.png',type:'img',name:'rice'},//米粉
	{path:'img/red.jpg',type:'img',name:'red'},//红包背面
	{path:'img/littleSky.png',type:'img',name:'littleSky'},//小云
	{path:'img/open.png',type:'img',name:'open'},//打开
	{path:'img/money.png',type:'img',name:'money'},//钱
	{path:'img/getRed.png',type:'img',name:'getRed'},//红包
	{path:'img/star.png',type:'img',name:'star'},//星星
	{path:'img/happiness1.png',type:'img',name:'happiness1'},//祝福语
	{path:'img/happiness2.png',type:'img',name:'happiness2'},//祝福语
	{path:'img/happiness3.png',type:'img',name:'happiness3'},//祝福语
	{path:'img/happiness4.png',type:'img',name:'happiness4'},//祝福语
	{path:'img/happiness5.png',type:'img',name:'happiness5'},//祝福语
	{path:'img/redBox.png',type:'img',name:'redBox'},//红包
	{path:'img/textBox.png',type:'img',name:'textBox'},//字体背景
	{path:'img/share.png',type:'img',name:'share'},//分享
	{path:'img/now.png',type:'img',name:'now'},//赶快收下
	{path:'img/hand.png',type:'img',name:'hand'},//手
	{path:'img/pop.jpg',type:'img',name:'pop'},//弹窗
	{path:'img/coupleShow.jpg',type:'img',name:'coupleShow'},
	{path:'img/up.png',type:'img',name:'up'},//手
];
//全局变量
var backLayer,musicLayer,imgList,choiceType=0;
function question(x,y,question){
	base(this,LSprite,[]);
	var self = this;
	self.bmp = rBmp(imgList['titleBkg']);
	self.x = x;
	self.y = y;
	self.addChild(self.bmp);
	if(question.length<=12)
		{
			self.word = new setWrapText(0, 89,50,question, '#440404', false, 420, false, 48, 3, 'happy')
			self.word.x = (self.bmp.getWidth()-self.word.getWidth())/2;
			self.addChild(self.word);
		}else{
			var length = Math.ceil(question.length/2);
			self.word1 = new setWrapText(0,50,50,question.substr(0,length),"#440404", false, 420, false, 48, 3, 'happy');
			self.word1.x = (self.bmp.getWidth()-self.word1.getWidth())/2;
			self.addChild(self.word1);
			self.word2 = new setWrapText(0,130,50,question.substr(length),"#440404", false, 420, false, 48, 3, 'happy');
			self.word2.x = (self.bmp.getWidth()-self.word2.getWidth())/2;
			self.addChild(self.word2);
		}

}
question.prototype.changeTitle=function(questions){
	var self = this;
	if(self.word!=UNDEFINED)
	{
		self.word.remove();
		if(questions.length<=12)
		{
			self.word = new setWrapText(0, 89,50,questions, '#440404', false, 420, false, 48, 3, 'happy')
			self.word.x = (self.bmp.getWidth()-self.word.getWidth())/2;
			self.addChild(self.word);
			self.word.alpha=0;
			LTweenLite.to(self.word,0.5,{alpha:1});
		}else{
			var length = Math.ceil(questions.length/2);
			self.word1 = new setWrapText(0,50,50,questions.substr(0,length),"#440404", false, 420, false, 48, 3, 'happy');
			self.word1.x = (self.bmp.getWidth()-self.word1.getWidth())/2;
			self.addChild(self.word1);
			self.word2 = new setWrapText(0,130,50,questions.substr(length),"#440404", false, 420, false, 48, 3, 'happy');
			self.word2.x = (self.bmp.getWidth()-self.word2.getWidth())/2;
			self.addChild(self.word2);
			self.word1.alpha=0;
			LTweenLite.to(self.word1,0.5,{alpha:1});
			self.word2.alpha=0;
			LTweenLite.to(self.word2,0.5,{alpha:1});
		}
	}else{
		self.word1.remove();
		self.word2.remove();
		if(questions.length<=12)
		{
			self.word = new setWrapText(0, 89,50,questions, '#440404', false, 420, false, 48, 3, 'happy')
			self.word.x = (self.bmp.getWidth()-self.word.getWidth())/2;
			self.addChild(self.word);
			self.word.alpha=0;
			LTweenLite.to(self.word,0.5,{alpha:1});
		}else{
			var length = Math.ceil(questions.length/2);
			self.word1 = new setWrapText(0,50,50,questions.substr(0,length),"#440404", false, 420, false, 48, 3, 'happy');
			self.word1.x = (self.bmp.getWidth()-self.word1.getWidth())/2;
			self.addChild(self.word1);
			self.word2 = new setWrapText(0,130,50,questions.substr(length),"#440404", false, 420, false, 48, 3, 'happy');
			self.word2.x = (self.bmp.getWidth()-self.word2.getWidth())/2;
			self.addChild(self.word2);
			self.word1.alpha=0;
			LTweenLite.to(self.word1,0.5,{alpha:1});
			self.word2.alpha=0;
			LTweenLite.to(self.word2,0.5,{alpha:1});
		}
	}
}
function answer(x,y,answer){
	base(this,LSprite,[]);
	var self = this;
	self.bmp = rBmp(imgList['answer']);
	self.x = x;
	self.y = y;
	self.addChild(self.bmp);
	self.word = new setWrapText(0, 47,50,answer, '#440404', false, 420, false, 48, 3, 'happy');
	self.word.x = (self.bmp.getWidth()-self.word.getWidth())/2;
	self.addChild(self.word);
}
function reels(question,className){
	base(this,LSprite,[]);
	var self = this;
	self.bmp = rBmp(imgList['reel01']);
	self.x = 335;
	self.y = 450;
	self.addChild(self.bmp);
	$(className).append('<p>'+question+'</p>');
	if(question.length<6)
	{
		
	}else if(question.length==8){
		$(className).css('font-size','0.38rem');
	}else if(question.length==9){
		$(className).css('font-size','0.36rem');
	}
	
	
}

function reelsv(x,y,question,className){
	base(this,LSprite,[]);
	var self = this;
	self.bmp = rBmp(imgList['reel02']);
	self.x = x;
	self.y = y;
	var h = self.bmp.getHeight();
	
	self.addChild(self.bmp);
	if(question.length<15)
	{
		$(className).css({"top":"31.41%","height":"38.18%"});
		
	}else if(question.length==16){
		self.bmp.scaleY = 1062/self.bmp.getHeight();
		self.y = 451;
		
	}else{
		self.bmp.scaleY = 1062/self.bmp.getHeight();
		self.y = 451;
	}
	for(var i=0;i<question.length;i++)
	{
		$(className).append('<p>'+question[i]+'</p>');
	}
}

