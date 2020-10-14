

```bash
├── app.js # 后端服务入口文件
├── controllers/    # 操作层目录
├── models/ # 数据模型model层目录
├── routers/ # 路由目录
├── services/   # 业务层目录
├── utils/  # 工具类目录
└── views/  # 模板目录
```


### 数据同步

```bash
cnpm install elasticdump
cd node_modules/elasticdump/bin
./elasticdump  --input=http://127.0.0.1:9200/cards --output=http://192.168.99.115:9200/cards --type=data
```
