<template>
  <div>
    <el-card>
      <div class="inputBox">
        <el-input
          placeholder="请输入内容"
          v-model="value"
          clearable
          @change="handSearch(value)"
          @input="searchText(value)"
          @focus="handFocus(value)"
        >
        </el-input>
        <el-button
          title="点击搜索或按下回车"
          type="primary"
          icon="el-icon-search"
        ></el-button>
        <!-- 搜索建议 -->
        <div
          v-if="suggestData.order"
          class="searchBox"
          :style="changeIndex ? 'display: block' : 'display: none;'"
        >
          <div class="box1">
            <div class="bf">
              <i class="el-icon-service"></i>
              单曲
            </div>
            <div class="br">
              <div class="brItem" v-for="item in suggestData.songs" :key="item.id">
                <a :href="`#/home/song/${item.id}`">{{item.name}}<span> - {{item.artists[0].name}}</span></a>
              </div> 
            </div>
          </div>
          <div class="box2">
            <div class="bf">
              <i class="el-icon-s-custom"></i>
              歌手
            </div>
            <div class="br" >
              <a :href="`#/home/artistdetail/${suggestData.artists[0].id}`">{{suggestData.artists[0].name}}</a>
            </div>
          </div>
          <div class="box3">
            <div class="bf">
              <i class="el-icon-folder-opened"></i>
              专辑
            </div>
            <div class="br">
              <div class="brItem" v-for="item in suggestData.albums" :key="item.id">
                <a :href="`#/home/albumdetail/${item.id}`">{{item.name}}<span> - {{item.artist.name}}</span></a>
              </div>
            </div>
          </div>
          <div class="box4">
            <div class="bf">
              <i class="el-icon-s-order"></i>
              歌单
            </div>
            <div class="br">
              <div class="brItem" v-for="item in suggestData.playlists" :key="item.id">
                <a :href="`#/home/songdetail/${item.id}`">{{item.name}}</a>
              </div>
              
            </div>
          </div>
        </div>
      </div>
      <!-- 搜索内容区域 -->
      <div class="span">
        搜索"李白"，找到 <em>{{ total }} </em> 个{{ activeName }}
      </div>
      <el-tabs
        type="border-card"
        v-model="activeName"
        @tab-click="handleClick(activeName)"
      >
        <el-tab-pane label="单曲" name="单曲">
          <div class="songBox">
            <table
              align="center"
              border="0"
              cellpadding="0"
              cellspacing="0"
              width="100%"
            >
              <tr v-for="(item, index) in searchData" :key="index">
                <td>{{ index + 1 }}</td>
                <td>
                  <span :title="`播放${item.name}`" @click="handMusic(item)"
                    ><i class="el-icon-video-play"></i
                  ></span>
                </td>
                <td>
                  <span :title="item.name">{{ item.name }}</span>
                </td>
                <td>
                  <a
                    :href="`#/home/artistdetail/${item.ar[0].id}`"
                    :title="`${item.ar[0].name}的音乐主页`"
                    >{{ item.ar[0].name }}</a
                  >
                  <span v-if="item.ar[1]"> /</span>
                  <a
                    v-if="item.ar[1]"
                    :href="`#/home/artistdetail/${item.ar[1].id}`"
                    :title="`${item.ar[1].name}的音乐主页`"
                    >{{ item.ar[1].name }}</a
                  >
                  <span v-if="item.ar[2]"> /</span>
                  <a
                    v-if="item.ar[2]"
                    :href="`#/home/artistdetail/${item.ar[2].id}`"
                    :title="`${item.ar[2].name}的音乐主页`"
                    >{{ item.ar[2].name }}</a
                  >
                </td>
                <td>
                  <a
                    :href="`#/home/albumdetail/${item.al.id}`"
                    :title="`${item.al.name}专辑`"
                    >《{{ item.al.name }}》</a
                  >
                </td>
                <td>
                  <span>{{ item.dt | formatSong }}</span>
                </td>
              </tr>
            </table>
          </div>
        </el-tab-pane>
        <el-tab-pane label="专辑" name="专辑">
          <div class="albumBox">
            <div class="boxItem" v-for="item in searchAlbum" :key="item.id">
              <img
                v-lazy="item.picUrl"
                alt=""
                @click="toAlbumDetail(item.id)"
              />
              <span class="span1">{{ item.name }}</span>
              <span class="span2">{{ item.artist.name }}</span>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="歌手" name="歌手">
          <div class="artistBox">
            <!-- 带图片区域 -->
            <div class="mainTop">
              <div class="mainBox" v-for="item in searchArtist1" :key="item.id">
                <img
                  v-lazy="item.picUrl"
                  alt=""
                  @click="toArtistDetail(item.id)"
                />
                <span>{{ item.name }}</span>
              </div>
            </div>
            <!-- 文本区域 -->
            <div class="mainBottom">
              <div
                class="mainSpan"
                v-for="item in searchArtist2"
                :key="item.id"
                @click="toArtistDetail(item.id)"
              >
                <span :title="item.name + '的音乐'"
                  >{{ item.name }} <i class="el-icon-user-solid"></i
                ></span>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="歌单" name="歌单">
          <div class="playlistBox">
            <table
              align="center"
              border="0"
              cellpadding="0"
              cellspacing="0"
              width="100%"
            >
              <tr height="62px" v-for="item in searchPlaylist" :key="item.id">
                <td>
                  <span title="播放全部" @click="handMusics(item.id)">
                    <i class="el-icon-video-play"></i>
                  </span>
                </td>
                <td>
                  <img
                    v-lazy="item.coverImgUrl"
                    alt=""
                    :title="item.name"
                    @click="toSongDetail(item.id)"
                  />
                </td>
                <td>
                  <span :title="item.name" @click="toSongDetail(item.id)">{{
                    item.name
                  }}</span>
                </td>
                <td>
                  <span>{{ item.trackCount }}首</span>
                </td>
                <td>
                  <span>by {{ item.creator.nickname }}</span>
                </td>
                <td>
                  <span>收藏：{{ item.bookCount }}</span>
                </td>
                <td>
                  <span>收听：{{ item.playCount | formatCount }}</span>
                </td>
              </tr>
            </table>
          </div>
        </el-tab-pane>
        <el-tab-pane label="MV视频" name="MV视频">
          <div class="mvBox">
            <div class="boxItem" v-for="item in searchMV" :key="item.id">
              <img v-lazy="item.cover" alt="" @click="toMvList(item.id)" />
              <span class="span1">{{ item.name }}</span>
              <span class="span2">by {{ item.artistName }}</span>
              <span class="sp1">
                <i class="el-icon-video-camera-solid"></i>
                {{ item.playCount | formatCount }}
              </span>
              <span class="sp2">{{ item.duration | formatSong }}</span>
            </div>
          </div>
        </el-tab-pane>
        <!-- 分页器 -->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="offset"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="limit"
          layout="total,sizes, prev, pager, next, jumper"
          :total="total"
          background
        >
        </el-pagination>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import { debounce } from '@/common/utils'
import { search, searchSuggest } from '@/common/searchAPI'
import { songTracks } from '@/common/playlistAPI'
export default {
  name: 'Search',
  data() {
    return {
      value: '',
      activeName: '单曲',
      total: 100, // 结果数量
      searchData: [], // 搜索单曲信息
      searchAlbum: [], // 专辑信息
      searchArtist1: [], // 带头像的歌手信息
      searchArtist2: [], // 文本歌手信息
      searchPlaylist: [], // 歌单
      searchMV: [], // 视频
      type: 1,
      offset: 1,
      limit: 10,
      suggestData: {
        albums:[],artists:[],songs:[],playlists:[]
      }, // 搜索建议数据
      changeIndex: false
    }
  },
  created() {
    this.value = this.$route.params.word
    this.getSearch()
  },
  methods: {
    // 搜索回调 -- change 仅在输入框失去焦点或用户按下回车时触发
    async handSearch(value) {
      if (value) {
        // this.$refs.input.blur()
        this.type = 1
        this.getSearch()
        this.changeIndex = false
      }
      
    },
    // input 在 Input 值改变时触发
     searchText(value) {
      this.changeIndex = true
      if (value) {
          const test = async () =>{
          const { data: res } = await searchSuggest(value)
          this.suggestData = res.result
        }
        debounce(test)
      } else {
        this.changeIndex = false
      }
    },
    // 仅当获取焦点时触发
    async handFocus(value){
      if(value){
        this.changeIndex = true
        const {data:res} = await searchSuggest(value)
        this.suggestData = res.result
        console.log(this.suggestData);
      }
    },
    // tags 标签点击触发
    async handleClick(value) {
      if (value == '单曲') {
        this.type = 1
        this.getSearch()
      }
      if (value == '专辑') {
        this.getAlbum()
      }
      if (value == '歌手') {
        this.getArtist()
      }
      if (value == '歌单') {
        this.getPlaylist()
      }
      if (value == 'MV视频') {
        this.getMv()
      }
    },
    // 封装搜索单曲接口
    async getSearch() {
      const { value, type, offset, limit } = this
      const result = (offset - 1) * limit
      const { data: res } = await search(value, type, result, limit)
      this.total = res.result.songCount
      this.searchData = res.result.songs
    },
    // 专辑
    async getAlbum() {
      const { value, offset, limit } = this
      const result = (offset - 1) * limit
      const { data: res } = await search(value, 10, result, limit)
      this.total = res.result.albumCount
      this.searchAlbum = res.result.albums
      this.type = 10
    },
    // 歌手
    async getArtist() {
      const { value, offset } = this
      this.limit = 30
      const result = (offset - 1) * this.limit
      const { data: res } = await search(value, 100, result, this.limit)
      this.total = res.result.artistCount
      this.searchArtist1 = res.result.artists.slice(0, 10)
      this.searchArtist2 = res.result.artists.slice(10)
      this.type = 100
    },
    // 歌单
    async getPlaylist() {
      const { value, offset, limit } = this
      const result = (offset - 1) * limit
      const { data: res } = await search(value, 1000, result, limit)
      this.total = res.result.playlistCount
      this.searchPlaylist = res.result.playlists
      this.type = 1000
    },
    // 视频
    async getMv() {
      const { value, offset, limit } = this
      const result = (offset - 1) * limit
      const { data: res } = await search(value, 1004, result, limit)
      this.total = res.result.mvCount
      this.searchMV = res.result.mvs
      this.type = 1004
    },
    // 监听 pagesize 每页条数 改变的事件
    handleSizeChange(newSize) {
      // console.log(`每页 ${newSize} 条`);
      this.limit = newSize
      if (this.type == 1) {
        this.getSearch()
      }
      if (this.type == 10) {
        this.getAlbum()
      }
      if (this.type == 100) {
        this.getArtist()
      }
      if (this.type == 1000) {
        this.getPlaylist()
      }
      if (this.type == 1004) {
        this.getMv()
      }
    },
    // 监听 pagenum 页码值 改变的事件
    handleCurrentChange(newPage) {
      // console.log(`当前页: ${newPage}`)
      this.offset = newPage
      if (this.type == 1) {
        this.getSearch()
      }
      if (this.type == 10) {
        this.getAlbum()
      }
      if (this.type == 100) {
        this.getArtist()
      }
      if (this.type == 1000) {
        this.getPlaylist()
      }
      if (this.type == 1004) {
        this.getMv()
      }
    },
    // 播放单曲
    handMusic(item) {
      this.$store.dispatch('getMusicData', item)
    },
    // 点击其他专辑跳转详情界面
    toAlbumDetail(value) {
      this.$router.push({ name: 'AlbumDetail', params: { id: value } })
    },
    // 挑战至歌手详情界面
    toArtistDetail(valueId) {
      this.$router.push({ name: 'ArtistDetail', params: { id: valueId } })
    },
    // 点击跳转对应歌单详情界面
    toSongDetail(value) {
      this.$router.push({ name: 'SongDetail', params: { id: value } })
    },
    // 播放全部歌曲
    async handMusics(value) {
      const { data: res } = await songTracks(value)
      res.songs.forEach((item) => {
        this.$store.dispatch('getMusicData', item)
      })
    },
    // 跳转至详细的播放界面
    toMvList(value) {
      this.$router.push({ name: 'MvList', params: { id: value } })
    }
  },
  watch: {
    '$route.path':function () {
      this.value = this.$route.params.word
    }
  }
}
</script>

<style lang="less" scoped>
.inputBox {
  position: relative;
  height: 40px;
  line-height: 40px;
  margin-bottom: 20px;
  .el-input {
    width: 36%;
  }
}
.span {
  margin: 28px 0 17px;
  color: #999;
  font-size: 14px;
  font-family: Arial, Helvetica, sans-serif;
  text-align: left;
  em {
    font-style: normal;
    text-align: left;
    font-size: inherit;
    color: #c20c0c;
  }
}
.songBox {
  table {
    tr {
      width: 100%;
      height: 40px;
      line-height: 40px;

      &:nth-child(2n + 1) {
        background-color: #eee;
      }
      td {
        text-align: center;
        &:nth-child(1) {
          width: 5%;
          font-size: 18px;
        }
        &:nth-child(2) {
          width: 5%;
          font-size: 24px;
          color: #aaa;
          cursor: pointer;
        }
        &:nth-child(3) {
          width: 40%;
          padding: 0 10px;
          span {
            cursor: pointer;
            &:hover {
              text-decoration: underline;
            }
          }
        }
        &:nth-child(4) {
          width: 20%;
          span {
            font-size: 13px;
          }
          a {
            color: #0c73c2;
          }
        }
        &:nth-child(5) {
          width: 22%;
          a {
            color: #999;
          }
        }
        &:nth-child(6) {
          width: 8%;
          min-width: 80px;
          font-size: 16px;
          color: #aaa;
        }
        a {
          &:hover {
            text-decoration: underline;
          }
        }
      }
      &:hover {
        background-color: rgb(231, 231, 231);
      }
    }
  }
}
.albumBox {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  .boxItem {
    // background-color: #bfa;
    width: 18%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 190px;
    margin-bottom: 20px;
    border: 1px solid #ccc;
    padding: 5px;
    border-radius: 5px;
    box-sizing: border-box;
    img {
      width: 100%;
      height: 130px;
      border-radius: 5px;
      cursor: pointer;
    }
    .span1 {
      font-size: 15px;
      /*1. 先强制一行内显示文本*/
      white-space: nowrap;
      /*2. 超出的部分隐藏*/
      overflow: hidden;
      /*3. 文字用省略号替代超出的部分*/
      text-overflow: ellipsis;
    }
    .span2 {
      font-size: 14px;
      color: #aaa;
    }
  }
}
.artistBox {
  .mainTop {
    padding: 10px 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .mainBox {
      width: 15%;
      height: 210px;
      margin-bottom: 10px;
      background-color: rgb(230, 230, 230);
      img {
        width: 95%;
        height: 172px;
        cursor: pointer;
      }
      span {
        display: block;
        width: 100%;
        height: 30px;
        line-height: 30px;
      }
    }
  }
  .mainBottom {
    padding: 10px 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .mainSpan {
      width: 18%;
      height: 40px;
      line-height: 40px;
      cursor: pointer;
      margin-bottom: 10px;
      background-color: rgb(230, 230, 230);
      span {
        font-size: 18px;
        .el-icon-user-solid {
          margin-left: 20px;
        }
      }
    }
  }
}
.playlistBox {
  table {
    tr {
      &:nth-child(2n + 1) {
        background-color: #eee;
      }
      td {
        text-align: center;
        &:nth-child(1) {
          width: 6%;
          font-size: 24px;
          color: #aaa;
          cursor: pointer;
        }
        &:nth-child(2) {
          width: 10%;
          line-height: 1;
          img {
            width: 50px;
            height: 50px;
            cursor: pointer;
          }
        }
        &:nth-child(3) {
          width: 40%;
          padding: 0 10px;
          text-align: left;
          span {
            cursor: pointer;
            &:hover {
              text-decoration: underline;
            }
          }
        }
        &:nth-child(4) {
          width: 6%;
          span {
            font-size: 13px;
          }
          a {
            color: #0c73c2;
          }
        }
        &:nth-child(5) {
          width: 12%;
          font-size: 14px;
          a {
            color: #999;
          }
        }
        &:nth-child(6) {
          width: 12%;
          font-size: 13px;
          color: #aaa;
        }
        &:nth-child(7) {
          width: 12%;
          font-size: 13px;
          color: #aaa;
        }
        a {
          &:hover {
            text-decoration: underline;
          }
        }
      }
      &:hover {
        background-color: rgb(231, 231, 231);
      }
    }
  }
}
.mvBox {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  .boxItem {
    position: relative;
    width: 18%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 185px;
    margin-bottom: 20px;
    border: 1px solid #ccc;
    // padding: 0 5px;
    border-radius: 5px;
    box-sizing: border-box;
    img {
      width: 100%;
      height: 120px;
      border-radius: 5px;
      cursor: pointer;
    }
    .span1 {
      text-align: left;
      font-size: 15px;
      /*1. 先强制一行内显示文本*/
      white-space: nowrap;
      /*2. 超出的部分隐藏*/
      overflow: hidden;
      /*3. 文字用省略号替代超出的部分*/
      text-overflow: ellipsis;
    }
    .span2 {
      font-size: 14px;
      color: #aaa;
      text-align: left;
    }
    .sp1 {
      position: absolute;
      top: 2px;
      right: 0;
      padding-right: 5px;
      height: 20px;
      line-height: 20px;
      color: #fff;
      box-sizing: border-box;
      text-align: right;
      font-size: 14px;
    }
    .sp2 {
      position: absolute;
      bottom: 63px;
      left: 0;
      padding-left: 5px;
      height: 20px;
      line-height: 20px;
      color: #fff;
      font-size: 14px;
    }
  }
}
.el-pagination {
  margin-top: 30px;
}
.searchBox {
  display: none;
  position: absolute;
  z-index: 999;
  top: 45px;
  left: 50%;
  width: 40%;
  transform: translate(-50%);
  // height: 300px;
  background-color: #fff;
  border: 1px solid #bebebe;
  box-shadow: 0 4px 7px #555;
  border-radius: 5px;
  > div {
    display: flex;
  }
  .bf {
    width: 100px;
    font-size: 14px;
    // background-color: pink;
  }
  .br {
    flex: 1;
    text-align: left;
    border-left: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    padding: 5px 0;
  }
  a {
    display: block;
    height: 26px;
    line-height: 26px;
    padding-left: 20px;
    color: rgb(70, 70, 70);
    &:hover {
      background-color: #ddd;
    }
  }
  .box1 {
    width: 100%;
    // height: 120px;
    // background-color: #bfa;
    .br {
      padding: 8px 0;
      .brItem {
        // background-color: #fff;
        height: 26px;
        span {
          color: rgb(95, 95, 95);
        }
      }
    }
  }
  .box2 {
    width: 100%;
    // height: 40px;
    background-color: #eee;
  }
  .box3 {
    width: 100%;
    // height: 75px;
  }
  .box4 {
    width: 100%;
    // height: 75px;
    background-color: #eee;
    .br {
      border-bottom: none;
    }
  }
}
</style>
