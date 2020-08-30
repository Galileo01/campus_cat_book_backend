
## 使用微信登录

#### 接口URL
> {{url}}/user/login

#### 请求方式
> POST

#### Content-Type
> json






#### 请求Body参数

```javascript
{
	"nickName": "ltt1",
	"avatarUrl": "",
	"gender": 0
}
```



## 取消收藏猫猫

#### 接口URL
> {{url}}/user/cancelCollectCat?name=ltt&catId=5f43b6018336a64294165d2e

#### 请求方式
> DELETE

#### Content-Type
> json

#### 请求Query参数

| 参数        | 示例值   | 是否必填   |  参数描述  |
| :--------   | :-----  | :-----  | :----  |
| name     | ltt | 必填 | - |
| catId     | 5f43b6018336a64294165d2e | 必填 | - |





#### 请求Body参数

```javascript

```



## 获取用户信息

#### 接口URL
> {{url}}/user/getInfo?name=ltt

#### 请求方式
> GET

#### Content-Type
> json

#### 请求Query参数

| 参数        | 示例值   | 是否必填   |  参数描述  |
| :--------   | :-----  | :-----  | :----  |
| name     | ltt | 必填 | - |





#### 请求Body参数

```javascript

```



## 更新用户基础信息

#### 接口URL
> {{url}}/user/updateInfo

#### 请求方式
> POST

#### Content-Type
> json






#### 请求Body参数

```javascript
{
	"preName": "hahah",
	"name":"ltt"
}
```



## 头像上传

#### 接口URL
> {{url}}/user/updateAvatar

#### 请求方式
> POST

#### Content-Type
> form-data






#### 请求Body参数

| 参数        | 示例值   | 是否必填   |  参数描述  |
| :--------   | :-----  | :-----  | :----  |
| avatar     | C:\fakepath\4089-1Q1241H954D3.jpg |  必填 | - |
| name     | ltt |  必填 | - |



## 获取收藏的猫猫

#### 接口URL
> {{url}}/user/getCats_co?name=ltt&limit=0

#### 请求方式
> GET

#### Content-Type
> json

#### 请求Query参数

| 参数        | 示例值   | 是否必填   |  参数描述  |
| :--------   | :-----  | :-----  | :----  |
| name     | ltt | 必填 | - |
| offset     | 1 | 必填 | - |
| limit     | 0 | 必填 | - |





#### 请求Body参数

```javascript

```



## 收藏猫猫

#### 接口URL
> {{url}}/user/collectCat

#### 请求方式
> POST

#### Content-Type
> json






#### 请求Body参数

```javascript
{
    "name":"ltt",
    "catId":"5f43b6018336a64294165d2e"
}
```



## 收藏动态

#### 接口URL
> {{url}}/user/collectTweet

#### 请求方式
> POST

#### Content-Type
> json






#### 请求Body参数

```javascript
{
	"name": "ltt",
	"tweetId": "5f46687865690a3170507baf"
}
```



## 删除猫猫

#### 接口URL
> {{url}}/cat/delete?name=test cat1

#### 请求方式
> DELETE

#### Content-Type
> json

#### 请求Query参数

| 参数        | 示例值   | 是否必填   |  参数描述  |
| :--------   | :-----  | :-----  | :----  |
| name     | test cat1 | 必填 | - |





#### 请求Body参数

```javascript

```



## 获取所有话题

#### 接口URL
> {{url}}/cat/getTopics

#### 请求方式
> GET

#### Content-Type
> json






#### 请求Body参数

```javascript

```



## 获取猫猫

#### 接口URL
> {{url}}/cat/get?limit=2

#### 请求方式
> GET

#### Content-Type
> json

#### 请求Query参数

| 参数        | 示例值   | 是否必填   |  参数描述  |
| :--------   | :-----  | :-----  | :----  |
| name     | cat | 必填 | - |
| offset     | 0 | 必填 | - |
| limit     | 2 | 必填 | - |





#### 请求Body参数

```javascript

```



## 创建猫猫

#### 接口URL
> {{url}}/cat/create

#### 请求方式
> POST

#### Content-Type
> json






#### 请求Body参数

```javascript
{
	"name": "test"
}
```



## 上传图片

#### 接口URL
> {{url}}/cat/uploadImg

#### 请求方式
> POST

#### Content-Type
> form-data






#### 请求Body参数

| 参数        | 示例值   | 是否必填   |  参数描述  |
| :--------   | :-----  | :-----  | :----  |
| img     | C:\fakepath\3822951_114058468000_2.jpg |  必填 | - |
| name     | test |  必填 | - |



## 删除指定下标图片

#### 接口URL
> {{url}}/cat/deleteImgByIndex?name=test&index=1

#### 请求方式
> DELETE

#### Content-Type
> json

#### 请求Query参数

| 参数        | 示例值   | 是否必填   |  参数描述  |
| :--------   | :-----  | :-----  | :----  |
| name     | test | 必填 | - |
| index     | 1 | 必填 | - |





#### 请求Body参数

```javascript

```



## 创建动态,图片

#### 接口URL
> {{url}}/tweet/createWithImgs

#### 请求方式
> POST

#### Content-Type
> form-data






#### 请求Body参数

| 参数        | 示例值   | 是否必填   |  参数描述  |
| :--------   | :-----  | :-----  | :----  |
| img     | C:\fakepath\3822951_114058468000_2.jpg |  必填 | - |
| img     | C:\fakepath\12-1F206115912.jpg |  必填 | - |
| user     | ltt |  必填 | - |
| text     | test imgs |  必填 | - |



## 创建动态,视频

#### 接口URL
> {{url}}/tweet/createWithVideo

#### 请求方式
> POST

#### Content-Type
> form-data






#### 请求Body参数

| 参数        | 示例值   | 是否必填   |  参数描述  |
| :--------   | :-----  | :-----  | :----  |
| video     | C:\fakepath\test.mp4 |  必填 | - |
| user     | ltt |  必填 | - |
| text     | test video  |  必填 | - |



## 获取所有动态

#### 接口URL
> {{url}}/tweet/getAll?offset=1

#### 请求方式
> GET

#### Content-Type
> json

#### 请求Query参数

| 参数        | 示例值   | 是否必填   |  参数描述  |
| :--------   | :-----  | :-----  | :----  |
| limit     | 2 | 必填 | - |
| offset     | 1 | 必填 | - |





#### 请求Body参数

```javascript

```



## 新建评论

#### 接口URL
> {{url}}/comment/create

#### 请求方式
> POST

#### Content-Type
> json






#### 请求Body参数

```javascript
{
	"tweet_id": "5f46686465690a3170507bae",
	"user": "ltt",
	"content": "test comment 2"
}
```



## 获取某个动态评论

#### 接口URL
> {{url}}/comment/getBytweedId?tweetId=5f46686465690a3170507bae

#### 请求方式
> GET

#### Content-Type
> json

#### 请求Query参数

| 参数        | 示例值   | 是否必填   |  参数描述  |
| :--------   | :-----  | :-----  | :----  |
| tweetId     | 5f46686465690a3170507bae | 必填 | - |





#### 请求Body参数

```javascript

```



## 新建申请

#### 接口URL
> {{url}}/apply/create

#### 请求方式
> POST

#### Content-Type
> json






#### 请求Body参数

```javascript
{
	"user": "ltt1",
	"right": 1
}
```



## 获取申请

#### 接口URL
> {{url}}/apply/get?limit=1

#### 请求方式
> GET

#### Content-Type
> json

#### 请求Query参数

| 参数        | 示例值   | 是否必填   |  参数描述  |
| :--------   | :-----  | :-----  | :----  |
| user     | ltt | 必填 | - |
| state     | false | 必填 | - |
| right     | 1 | 必填 | - |
| limit     | 1 | 必填 | - |





#### 请求Body参数

```javascript

```



## 新建问题反馈

#### 接口URL
> {{url}}/bug/create

#### 请求方式
> POST

#### Content-Type
> form-data






#### 请求Body参数

| 参数        | 示例值   | 是否必填   |  参数描述  |
| :--------   | :-----  | :-----  | :----  |
| user     | ltt |  必填 | - |
| title     | 测试 |  必填 | - |
| img     | C:\fakepath\12-1F206115912.jpg |  必填 | - |
| img     | C:\fakepath\4089-1Q1241H954D3.jpg |  必填 | - |


