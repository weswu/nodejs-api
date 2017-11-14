# nodejs API
> 使用node编写接口

### 技术栈
- express
- node

### 如何运行
```
npm install   # 安装依赖
```

```
node index.js  # 生成服务器 [http://localhost:8080](http://localhost:8080)
```

### 调试
必需Google浏览器版本64及以上
```
node --inspect index.js   # 运行服务器
```

### now免费服务器
```
npm install -g now
now login 你的邮箱@qq.com
now --public  生成链接地址
```

### 接口
#### 通过微信文章网址抓取标题和内容
/api/article

| 参数名 | 必填 | 描述 | 默认值 | 参考值 |
| --- | :---: | --- | --- | --- |
| url | 是 | 微信文章链接地址 | - | - |


## 参考
- [zgj233-抓取文章](https://github.com/zgj233/weixin_article_spiders)
- [now-文档](https://zeit.co/docs/deployment-types/node)
