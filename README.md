# nodejs API
> 使用node编写接口

**捕获的资源**
+ 通过关键词搜索出来的微信文章列表会保存在 /res/list 下面
    + 在文章列表中选择 “抓取此条” 之后，会将此条文章保存在 /res/oneArticle 下面
+ 通过 指定 url 抓取出来的 图片和文章会保存到 /res/img-txt 下面


### 如何运行
```
npm install   # 安装依赖
```

```
node index.js  # 生成服务器 [http://localhost:8080](http://localhost:8080)
```

### now免费服务器
```
npm install -g now
now login 你的邮箱@qq.com
now --public  生成链接地址
```
### 接口

## 通过微信文章网址抓取标题和内容

/api/article

| 参数名 | 必填 | 描述 | 默认值 | 参考值 |
| --- | :---: | --- | --- | --- |
| url | 是 | 微信文章链接地址 | - | - |


## 参考
[zgj233案例](https://github.com/zgj233/weixin_article_spiders)
[now文档](https://zeit.co/docs/deployment-types/node)
