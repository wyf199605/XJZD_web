<template>
    <div class="wx-uploader-wrapper">
        <div class="wx-uploader_preview" v-for="(picture, index) of pictures" :key="index">
            <div class="wx-uploader_preview-image" @click="previewHandler(picture)">
                <van-image width="80" height="80" :src="picture"/>
            </div>
        </div>
        <div class="wx-uploader_upload" @click="uploadHandler">
            <van-icon name="photograph" size="24" color="#dcdee0"/>
        </div>
    </div>
</template>

<script>
    import { Image, Icon } from "vant";
    import wx from "weixin-js-sdk";

    export default {
        name: "WxUploader",
        components: {
            [Image.name]: Image,
            [Icon.name]: Icon,
        },
        model: {
            prop: 'value',
            event: 'change',
        },
        props: {
            value: {
                type: Array,
            }
        },
        data() {
            return {
                pictures: [],
            };
        },
        methods: {
            /**
             * 上传图片方法
             */
            uploadHandler() {
                wx.chooseImage({
                    count: 1, // 默认9
                    sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
                    sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
                    success: function (res) {
                        res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
                    }
                });
            },
            /**
             * 预览图片方法
             * @param {string} picture
             */
            previewHandler(picture) {
                wx.previewImage({
                    current: picture, // 当前显示图片的http链接
                    urls: this.pictures // 需要预览的图片http链接列表
                });
            },
        },
    }
</script>

<style scoped lang="scss">
    .wx-uploader-wrapper {
        @include flex(flex-start);
        flex-wrap: wrap;

        .wx-uploader_preview,
        .wx-uploader_upload {
            position: relative;
            margin: 0 8px 8px 0;
            cursor: pointer;
        }

        .wx-uploader_preview-image,
        .wx-uploader_upload {
            @include wh(80px);
            border-radius: 8px;
            overflow: hidden;
        }

        .wx-uploader_upload {
            @include flex;
            background-color: #f7f8fa;
        }
    }
</style>