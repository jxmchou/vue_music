<template>
  <div class="musicBox" :class="{ change: value == false }">
    <!-- 准备一个容器用来存放音乐播放器 -->
    <div id="aplayer" ref="ap"></div>
  </div>
</template>

<script>
import APlayer from 'aPlayer' // 引入音乐插件
import 'aPlayer/dist/APlayer.min.css' // 引入音乐插件的样式
import { mapState } from 'vuex'
export default {
  name: 'playMusic',
  data() {
    return {
      audio: [
        // 歌曲列表
        {
          id:'1907326444',
          name: '好想抱住你 DJ版', // 歌曲名字
          artist: '玥玥子', // 歌曲演唱者
          // 歌曲地址（这里用外链地址）
          url: 'http://music.163.com/song/media/outer/url?id=1907326444.mp3',
          cover:
            'https://p1.music.126.net/v7MVSxXIQlmkwSK2OVf2_w==/109951166861485315.jpg?param=130y130', // 歌曲头像
          lrc: '', // 歌词
          theme: '#FFC1C1' // 播放这首歌曲时的主题色
        },
        //#region 
        /*
        {
          id: 1891469546,
          name: '删了吧', // 歌曲名字
          artist: '烟(许佳豪)', // 歌曲演唱者
          // 歌曲地址（这里用外链地址）
          url: 'http://music.163.com/song/media/outer/url?id=1891469546.mp3',
          cover:
            'https://p2.music.126.net/nNg4YjkcK1AwCX1FrN8VOQ==/109951166578333625.jpg?param=130y130', // 歌曲头像
          lrc: '[00:00.000] 作词 : 陶旧\n[00:01.000] 作曲 : 楚明玉\n[00:02.000] 编曲 : 曾吴秋杰\n[00:03.000] 制作人 : 曾吴秋杰\n[00:17.71]出品：云上×深声文化\n[00:32.46]电话我查询过了没欠费\n[00:39.96]讯息随时听着网络畅通\n[00:47.46]音量的开关我反复确认几遍\n[00:54.45]是极致的忘我的期待\n[01:01.19]八个字的留言在对话栏\n[01:04.95]我点了清除又写好几遍\n[01:08.70]置顶和你标记未读的聊天\n[01:11.71]以为所有声响都是你的出现\n[01:15.95]要不你还是把我删了吧\n[01:18.95]我咬紧牙关命令我发出这句话\n[01:22.45]天黑之前再讲一句晚安吧 就这样吧\n[01:27.46]往后的日子别来无恙啊\n[01:30.94]多想此刻你也很遗憾吧\n[01:33.70]我们的故事画上句点到此为止啦\n[01:37.20]聊天与合照彼此别再收藏了\n[01:40.70]所以再见亲爱的你呀\n[01:57.45]八个字的留言在对话栏\n[02:00.45]我点了清除又写好几遍\n[02:04.20]置顶和你标记未读的聊天\n[02:07.45]以为所有声响都是你的出现\n[02:11.21]要不你还是把我删了吧\n[02:14.20]我咬紧牙关命令我发出这句话\n[02:17.96]天黑之前再讲一句晚安吧 就这样吧\n[02:22.95]往后的日子别来无恙啊\n[02:26.20]多想此刻你也很遗憾吧\n[02:29.45]我们的故事画上句点到此为止啦\n[02:32.70]聊天与合照彼此别再收藏了\n[02:36.20]所以再见亲爱的你呀\n[02:40.70]要不你还是把我删了吧\n[02:44.20]我咬紧牙关命令我发出这句话\n[02:47.21]天黑之前再讲一句晚安吧 就这样吧\n[02:52.45]往后的日子别来无恙啊\n[02:55.45]多想此刻你也很遗憾吧\n[02:58.46]我们的故事画上句点到此为止啦\n[03:02.20]聊天与合照彼此别再收藏了\n[03:05.71]所以再见亲爱的你呀\n[03:07.280] 吉他 : 邵钜富\n[03:09.489] 混音 : 周星宇\n[03:11.698] 和声 : 李坚瑜\n[03:13.907] 企划 : 何泽镔\n[03:16.116] 营销 : 余祖意/张程皓/张一乔\n[03:18.325] 统筹 : 尹文/王溯\n[03:20.534] 本歌曲来自〖云上工作室〗\n[03:22.743] 10亿现金激励，千亿流量扶持！\n[03:24.952] 业务联系：yunmusic_2013@163.com\n', // 歌词
          theme: '#FFE4E1' // 播放这首歌曲时的主题色
        },
         {
          name: '可不可以',
          artist: '张紫豪',
          url: 'http://music.163.com/song/media/outer/url?id=553755659.mp3',
          cover:
            'https://p1.music.126.net/WafK2OQfEtqXitdDXJ772Q==/109951163252847249.jpg?param=130y130', // 歌曲头像
          lrc: '[00:00.000] 作词 : 刘伟锋\n[00:00.514] 作曲 : 刘伟锋\n[00:01.29]编曲：刘伟锋\n[00:02.16]录制混缩：巨人先生\n[00:03.16]出品：西亚斯音频工作室\n[00:04.04]企划：谭梦\n[00:05.04]发行公司：恬音文化\n[00:16.50]说好带你流浪\n[00:20.09]而我却半路返航\n[00:23.62]坠落自责的海洋\n[00:27.25]\n[00:30.72]发现离不开你\n[00:34.21]我开始决定回去\n[00:37.80]你已不在原地\n[00:42.64]\n[00:44.02]我可以接受你的所有\n[00:46.16]所有小脾气\n[00:47.54]我可以带你去吃很多\n[00:49.73]很多好东西\n[00:51.13]我可以偶尔给你带来\n[00:53.24]带来小甜蜜\n[00:54.65]就像前几年那样\n[00:56.05]每天都会给你制造很多惊喜\n[00:58.73]你的心伤 我能治愈\n[01:01.80]我的快乐也只有你能给予\n[01:06.26]我们就别再分离\n[01:11.73]可不可以 和你在一起\n[01:15.30]我们之间有太多回忆\n[01:18.82]爱上了你 没什么道理\n[01:22.31]只是刚好情窦初开遇到你\n[01:25.82]不希望我的未来不是你\n[01:29.44]只愿意和你永远不分离\n[01:33.03]趁我还没有过保质期\n[01:36.59]趁你还愿意\n[01:39.64]\n[02:10.34]三年的回忆\n[02:13.04]\n[02:13.82]我如何抹去\n[02:17.42]能不能再拾起\n[02:22.29]\n[02:24.53]永远在一起\n[02:27.58]\n[02:28.08]还没有过期\n[02:30.64]\n[02:31.64]我们就别再分离\n[02:36.44]\n[02:37.23]可不可以 和你在一起\n[02:40.44]我们之间有太多回忆\n[02:44.33]爱上了你 没什么道理\n[02:47.72]只是刚好情窦初开遇到你\n[02:51.29]不希望我的未来不是你\n[02:54.79]只愿意和你永远不分离\n[02:58.36]趁我还没有过保质期\n[03:01.91]趁你还愿意\n[03:05.34]可不可以 和你在一起\n[03:09.10]我们之间有太多回忆\n[03:12.57]爱上了你 没什么道理\n[03:16.01]只是刚好情窦初开遇到你\n[03:19.63]不希望我的未来不是你\n[03:23.28]只愿意和你永远不分离\n[03:26.79]趁我还没有过保质期\n[03:30.29]趁你还愿意\n[03:33.38]\n[03:33.92]趁我还没有过保质期\n[03:38.15]\n[03:41.23]趁你还愿意\n',
          theme: '#FFEFD5'
        },
        {
          name: '再见前任',
          artist: '冯提莫',
          url: 'http://music.163.com/song/media/outer/url?id=524152797.mp3',
          cover:
            'https://p1.music.126.net/w-yL-trTZTAp_G5IXue9MQ==/109951163088030439.jpg?param=130y130', // 歌曲头像
          lrc: '[00:00.000] 作词 : 孟令楠\n[00:01.000] 作曲 : 刘洲\n[00:19.03]编曲：刘洲\n[00:19.42]\n[00:25.70]谈个恋爱费脑力\n[00:29.36]分个手又用 尽体力\n[00:34.39]爱情游戏  人设不实际  别太着急\n[00:40.33]\n[00:41.54]姐姐妹妹演出戏\n[00:45.44]幻想着 反转偶像剧情\n[00:50.10]无奈受气  前男友夜夜  笙歌开心\n[00:57.26]\n[00:59.65]从一开始的“宝贝 早点睡 喝热水”\n[01:03.90]到后来变成 “开会在 忙无所谓”\n[01:07.95]最后到一退再退岌岌可危\n[01:11.84]前任说再见 拒绝整日买醉\n[01:15.88]\n[01:16.93]Darling 崩塌再重生 的宿命\n[01:24.51]失恋的魔力 放生和回忆 到不清醒\n[01:33.42]装什么委屈 谈什么哲理\n[01:37.38]再见前任 别靠近\n[01:39.73]\n[01:41.79]凌晨一点一十一\n[01:45.39]夜场偶遇全靠演技\n[01:50.51]嘿又是你 寒暄中带着 一丝犹豫\n[01:56.19]\n[01:57.39]午后两点三十七\n[02:01.36]手机里窥探了小秘密\n[02:06.28]宝贝哈尼 女生英文名 从A到Z\n[02:13.24]\n[02:15.71]从一开始的“宝贝 早点睡 喝热水”\n[02:19.89]到后来变成 “开会在 忙无所谓”\n[02:23.90]你冷漠无情无义呼来唤去\n[02:27.91]不就是有自信 我依然爱着你\n[02:32.21]\n[02:33.06]缘分 像木马旋转 不停\n[02:40.84]想突围困境 酒精洗脑 一干二净\n[02:49.41]爱了就后悔 忘了我的美\n[02:53.78]Baby你说再见就再见吧\n[02:57.42]我们还 能有多少真爱\n[03:01.41]Goodbye my love\n[03:03.36]再见  你就是唯一\n[03:05.88]再见我的真心\n[03:08.55]\n[03:09.55]定位制作人：刘洲\n[03:10.55]监制：孟令楠\n[03:11.55]吉他：王传统\n[03:12.55]录音师：时俊峰\n[03:13.55]混音师：时俊峰\n[03:14.55]企划：周康浩楠\n[03:15.55]出品：多耳音乐\n',
          theme: '#FFC1C1'
        } */
        //#endregion
      ],
      info: {
        fixed: false, // 开启吸底模式
        mini: false, // 最小化
        listFolded: true, // 折叠歌曲列表
        autoplay: false, // 不开启自动播放
        preload: 'audio', // 自动预加载歌曲
        loop: 'all', // 播放循环模式、all全部循环 one单曲循环 none只播放一次
        order: 'list', //  播放模式，list列表播放, random随机播放
        lrcType: 1
      },
      value: true,
      value2: true,
      app: {},
      add: false
    }
  },
  computed: {
    ...mapState(['musicData', 'musicWait'])
  },
  mounted() {
    // 初始化播放器
    this.initAudio()
    // 修改播放器内置按钮
    this.iconChange()
    this.$bus.$on('getValue1', (data) => {
      this.value = data
    })
    this.$bus.$on('getValue2', (data) => {
      if (data == false) {
        this.app.setMode('mini')
      } else {
        this.app.setMode('normal')
      }
    })
    this.$bus.$on('getAdd', (data) => {
      this.add = data
    })
  },
  beforeDestroy() {
    this.$bus.$off('getValue1')
    this.$bus.$off('getValue2')
    this.$bus.$off('getPlay')
    this.$bus.$off('getAdd')
  },
  methods: {
    // 创建实例对象
    initAudio() {
      // 创建一个音乐播放器实例，并挂载到DOM上，同时进行相关配置
      const ap = new APlayer({
        container: document.getElementById('aplayer'),
        audio: this.audio, // 音乐信息
        ...this.info // 其他配置信息
      })
      this.app = ap
      // console.log(this);
    },
    // 修改内置样式
    iconChange() {
      const body = document.querySelector('.aplayer-body')
      body.style.margin = '0 5px'
      const parent = document.querySelector('.aplayer-time')
      const clearSpan = document.createElement('i')
      // 创建清空列表按钮
      clearSpan.title = '清空播放列表'
      clearSpan.className = 'clearMusic el-icon-delete'
      clearSpan.style.bottom = '28px'
      parent.appendChild(clearSpan)
      clearSpan.addEventListener('click', this.clearMusic)
      // 显示按钮/鼠标放置显示文字提示
      // const btn = document.querySelector('.aplayer-time')
      const back = document.querySelector('.aplayer-icon-back')
      back.title = '上一首'
      back.style.display = 'inline-block'
      const play = document.querySelector('.aplayer-icon-play')
      play.title = '暂停/播放'
      play.style.display = 'inline-block'
      const forward = document.querySelector('.aplayer-icon-forward')
      forward.title = '下一首'
      forward.style.display = 'inline-block'
      const lrc = document.querySelector('.aplayer-icon-lrc')
      lrc.title = '显示/隐藏播放'
      lrc.style.display = 'inline-block'
      const btn = document.querySelectorAll('.aplayer-time .aplayer-icon')
      for (let i = 0; i < 8; i++) {
        btn[i].style.width = '17px'
        btn[i].style.height = '17px'
      }

      // 鼠标放置显示文字提示
      const volume = document.querySelector('.aplayer-volume-wrap')
      volume.title = '音乐播放音量'
      const order = document.querySelector('.aplayer-icon-order')
      order.title = '播放顺序：列表或随机'
      const loop = document.querySelector('.aplayer-icon-loop')
      loop.title = '循环设置：列表循环、单曲循环、禁止循环'
      const menu = document.querySelector('.aplayer-icon-menu')
      menu.title = '播放列表显示'
    },
    // 清空播放列表
    async clearMusic() {
      if (this.audio.length > 0) {
        try {
          // 弹框询问是否删除
          await this.$confirm('此操作将清空播放列表, 是否继续?', '清空', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
          this.app.list.clear() // 清空播放列表
          this.app.pause() // 暂停音频
          return this.$message.success('列表清空成功!')
        } catch (e) {
          this.$message.info('取消删除')
        }
      } else {
        return this.$message.error('列表已经清空!')
      }
    },
    // 添加歌曲前先检测
    getMusicValue(n) {
      if (n.id == 0) {
        return this.$message.error('获取音乐信息失败')
      } else {
        const obj = this.app.list.audios.find((item) => {
          return item.id === n.id
        })
        // console.log(obj)
        if (obj) {
          return this.close(n.name)
        }
        if (this.musicWait == true) {
          this.app.list.add(n)
          this.open(n.name)
        } else {
          this.app.list.add(n)
          this.app.list.switch(this.app.list.audios.length - 1)
          setTimeout(() => {
            this.app.play()
          }, 1000)
          this.open(n.name)
        }
      }
    },
    open(name) {
      this.$notify({
        title: `歌曲: ${name}`,
        type: 'success',
        dangerouslyUseHTMLString: true,
        message: '<strong>以添加到播放到列表且播放</strong>',
        offset: 100
      })
    },
    close(name) {
      this.$notify({
        title: `${name}`,
        type: 'error',
        dangerouslyUseHTMLString: true,
        message: '<strong>歌曲已在播放列表中</strong>',
        offset: 100
      })
    }
  },
  watch: {
    musicData: {
      handler(n, _) {
        this.getMusicValue(n)
        // console.log(n);
      },
      deep: true
    }
  }
}
</script>

<style lang="less" scoped>
.musicBox {
  width: 100%;
  position: fixed;
  bottom: 0;
  // margin-top: 60px;
  transition: all 1s;
  #aplayer {
    margin: 0;
  }
}
.change {
  margin-bottom: -100px;
  transition: all 1s;
}
</style>
