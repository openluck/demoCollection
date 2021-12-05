import { useState } from 'react'
import { NewFamousCotainerCss, ContainerCss } from './style'

import Header from '../../components/header'

const Home = () => {
  const [newsFamous] = useState([
    { name: '新浪新闻', href: 'http://news.sina.com.cn/' },
    { name: '凤凰资讯', href: 'http://news.ifeng.com/' },
    { name: '腾讯新闻', href: 'http://news.qq.com/' },
    { name: '人民网', href: 'http://www.people.com.cn/' },
    { name: '星岛环球网', href: 'http://www.stnn.cc/' },
    { name: '搜狐新闻', href: 'http://news.sohu.com/' },
    { name: '环球网', href: 'http://www.huanqiu.com/' },
    { name: '参考消息', href: 'http://www.cankaoxiaoxi.com' },
    { name: '大公网', href: 'http://www.takungpao.com' },
    { name: '澎湃新闻', href: 'http://www.thepaper.cn/' },
    { name: '新华网', href: 'http://www.xinhuanet.com/' },
    { name: '中国新闻网', href: 'http://www.chinanews.com/' },
    { name: '南方网', href: 'http://www.southcn.com/' },
    { name: '中国文明网', href: 'http://www.wenming.cn/' },
    { name: '百度新闻搜索', href: 'http://news.baidu.com/' },
    { name: '中国政府网', href: 'http://www.gov.cn/jrzg/' },
    { name: '中国军网', href: 'http://www.81.cn/' },
    { name: '中华网', href: 'http://www.china.com/' },
    { name: '央广网', href: 'http://www.cnr.cn/' },
    { name: '国际在线', href: 'http://www.cri.cn/index.html' },
    { name: '网易新闻', href: 'http://news.163.com/' },
    { name: '央视网新闻', href: 'http://news.cntv.cn/' },
    { name: '中国青年网', href: 'http://www.youth.cn/' },
    { name: '宣讲家', href: 'http://www.71.cn/' },
    { name: '好奇心日报', href: 'http://www.qdaily.com/' },
    { name: '未来网', href: 'http://www.k618.cn/' }
  ])
  const [newsPapers] = useState([
    {
      name: '人民日报',
      href: 'http://paper.people.com.cn/rmrb/paperindex.htm'
    },
    { name: '南方周末', href: 'http://www.infzm.com/' },
    { name: '法制网', href: 'http://www.legaldaily.com.cn/' },
    { name: '中青在线', href: 'http://www.cyol.net/' },
    { name: '新京报', href: 'http://www.bjnews.com.cn/' },
    { name: '香港文汇网', href: 'http://www.wenweipo.com/' },
    { name: '中国共产党网', href: 'http://www.12371.cn/' },
    { name: '光明网', href: 'http://www.gmw.cn/' },
    { name: '华商网', href: 'http://www.hsw.cn/' },
    { name: '大河网', href: 'https://www.dahe.cn/' },
    { name: '南风窗', href: 'http://www.nfcmag.com/' },
    { name: '中国日报网', href: 'http://www.chinadaily.com.cn/' },
    { name: '广西新闻网', href: 'http://www.gxnews.com.cn/' },
    { name: '消费日报', href: 'http://www.xfrb.com.cn/' },
    { name: '金羊网', href: 'http://www.ycwb.com/' },
    { name: '山西新闻网', href: 'http://www.sxrb.com/' },
    { name: '黑龙江东北网', href: 'http://www.dbw.cn/' },
    { name: '东南网', href: 'http://www.fjsen.com/' },
    { name: '山东大众网', href: 'http://www.dzwww.com/' },
    { name: '楚天都市报', href: 'http://ctdsb.cnhubei.com/' },
    { name: '奥一网', href: 'http://www.oeeee.com/' },
    { name: '重庆华龙网', href: 'http://www.cqnews.net/' },
    { name: '中国新闻周刊', href: 'http://www.inewsweek.cn/' },
    { name: '扬子晚报', href: 'http://www.yangtse.com/' },
    { name: '三联生活周刊', href: 'http://www.lifeweek.com.cn/' },
    { name: '看看新闻网', href: 'http://www.kankanews.com/' },
    { name: '中国警察网', href: 'http://www.cpd.com.cn/' },
    { name: '海外网', href: 'http://www.haiwainet.cn/' },
    { name: '半月谈', href: 'http://www.banyuetan.org/' },
    { name: '中国汽车报', href: 'http://www.cnautonews.com' },
    { name: '一点资讯', href: 'http://www.yidianzixun.com/' },
  ])
  const [newForegin] = useState([
    { name: '美国中文网', href: 'http://www.sinovision.net/' },
    { name: '联合国新闻', href: 'http://www.un.org/chinese/News/' },
    { name: '美国CNN', href: 'http://edition.cnn.com/' },
  ])
  const [newCurrent] = useState([
    {
      name: '天涯国际观察',
      href: 'http://bbs.tianya.cn/list-worldlook-1.shtml'
    },
    { name: '凤凰网评论', href: 'http://pl.ifeng.com/' },
    { name: '中评网', href: 'http://www.crntt.com/' },
    { name: '铁血社区', href: 'http://bbs.tiexue.net/' },
    { name: '强国社区', href: 'http://bbs1.people.com.cn/' },
    { name: '天涯杂谈', href: 'http://bbs.tianya.cn/list-free-1.shtml' },
    { name: '新闻1+1', href: 'http://tv.cctv.com/lm/xinwen1j1/' },
    { name: '四月网', href: 'http://www.m4.cn/' },
    { name: '凤凰周刊', href: 'http://www.ifengweekly.com' },
    { name: '观察者网', href: 'http://www.guancha.cn/' },
    { name: '爱思想', href: 'http://www.aisixiang.com/' },
    { name: '背景', href: '' }
  ])
  const [jijingHot] = useState([
    {
      name: '中国基金报',
      href: 'https://www.chnfund.com/fund'
    }
  ])
  const [chianOfficeNews] = useState([
    {
      name: '国家统计局',
      href: 'http://www.stats.gov.cn/tjsj/'
    },
    {
      name: '中华人民共和国中央人民政府',
      href: 'http://www.gov.cn/xinwen/yaowen.htm'
    }
  ])
  const [jijingData] = useState([
    {
      name: '天天基金',
      href: 'https://fund.eastmoney.com/'
    },
    {
      name: '新浪基金新闻',
      href: 'https://finance.sina.com.cn/fund/'
    },
    {
      name: '每经网',
      href: 'http://www.nbd.com.cn/'
    },
  ])
  const [jijingCompany] = useState([
    {
      name: '富国基金',
      href: 'https://www.fullgoal.com.cn/index.html?pc'
    }
  ])
  const [luyan] = useState([
    {
      name: '私募排排网',
      href: 'https://www.simuwang.com/'
    }
  ])
  
  return (
    <div>
      <Header />
      <NewFamousCotainerCss>
        <ContainerCss>
          <span className="tag" >基金公司({jijingCompany.length})</span>
          {jijingCompany.map(item => {
            return <a target="_blank" className="news-item" href={item.href}>{item.name}</a>
          })}
        </ContainerCss>
        <ContainerCss>
          <span className="tag" >路演网站({luyan.length})</span>
          {luyan.map(item => {
            return <a target="_blank" className="news-item" href={item.href}>{item.name}</a>
          })}
        </ContainerCss>
        <ContainerCss>
          <span className="tag" >基金数据({jijingData.length})</span>
          {jijingData.map(item => {
            return <a target="_blank" className="news-item" href={item.href}>{item.name}</a>
          })}
        </ContainerCss>
        <ContainerCss>
          <span className="tag" >中国官方网({chianOfficeNews.length})</span>
          {chianOfficeNews.map(item => {
            return <a target="_blank" className="news-item" href={item.href}>{item.name}</a>
          })}
        </ContainerCss>
        <ContainerCss>
          <span className="tag" >中国基金报({jijingHot.length})</span>
          {jijingHot.map(item => {
            return <a target="_blank" className="news-item" href={item.href}>{item.name}</a>
          })}
        </ContainerCss>
        <ContainerCss>
          <span className="tag">新闻名站({newsFamous.length})</span>
          {newsFamous.map(item => {
            return <a target="_blank" className="news-item" href={item.href}>{item.name}</a>
          })}
        </ContainerCss>
        <ContainerCss>
          <span className="tag">新闻报刊({newsPapers.length})</span>
          {newsPapers.map(item => {
            return <a target="_blank" className="news-item" href={item.href}>{item.name}</a>
          })}
        </ContainerCss>
        <ContainerCss>
          <span className="tag">外国媒体({newForegin.length})</span>
          {newForegin.map(item => {
            return <a target="_blank" className="news-item" href={item.href}>{item.name}</a>
          })}
        </ContainerCss>
        <ContainerCss>
          <span className="tag">时事评论({newCurrent.length})</span>
          {newCurrent.map(item => {
            return <a target="_blank" className="news-item" href={item.href}>{item.name}</a>
          })}
        </ContainerCss>

      </NewFamousCotainerCss>
    </div>
  )
}

export default Home