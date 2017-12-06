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

例如
https://mp.weixin.qq.com/s/n5lZxufiBkRe5uD7pfhsag

https://mp.weixin.qq.com/s?__biz=MzA4MzEzNTU4NQ==&mid=2451317459&idx=1&sn=3d21b79881c94ed48cc413672a2b6665&chksm=88139fddbf6416cb00ba84db97df052fb5ad62325a560aeacb157a7b8abe4ad1c0072e6a4d74#rd


## 参考
- [zgj233-抓取文章](https://github.com/zgj233/weixin_article_spiders)
- [now-文档](https://zeit.co/docs/deployment-types/node)
