<template>
    <!-- 订单详细页面 -->
    <div class="detail-page">
        <van-skeleton
            row="6"
            avatar
            title
            animate
            :loading="!loaded"
        >
            <van-panel :title="title" :desc="'发布时间：' + createTime" :status="canOperate ? '' : '已被其他人接单'">
                <div class="detail-content">
                    <section>
                        <pre>{{details}}</pre>
                    </section>
                    <van-row v-if="pictures.length > 0" style="margin-top: 20px;" gutter="10">
                        <van-col
                                v-for="(picture, index) of pictures"
                                :key="index"
                                span="8"
                                style="margin-bottom: 5px;"
                        >
                            <van-image
                                    :src="picture"
                                    @click="picturePreviewHandler(index)"
                            >
                                <template v-slot:loading>
                                    <van-loading type="spinner" size="20"/>
                                </template>
                            </van-image>
                        </van-col>
                    </van-row>

                    <div class="detail-info" style="margin-top: 20px;">
                        <p>
                            <span class="label">预算金额：</span>
                            <span class="text strong">{{budget}}</span>
                        </p>
                        <p>
                            <span class="label">技术要求：</span>
                            <span class="text">{{codeType}}</span>
                        </p>
                        <p>
                            <span class="label">完成时间：</span>
                            <span class="text">{{deadline}}</span>
                        </p>

                    </div>

                    <template v-if="canOperate">
                        <van-divider>以下为订单进度</van-divider>
                        <van-steps v-if="status !== 4" :active="status" active-icon="success">
                            <van-step>发布成功</van-step>
                            <van-step>开发ing</van-step>
                            <van-step>等待查收</van-step>
                            <van-step>订单完成</van-step>
                        </van-steps>
                        <p v-else class="status-msg"><van-icon name="failure" size="20px"/>该订单已取消</p>
                    </template>
                </div>

                <template #footer>
                    <!-- 发布者功能 -->
                    <template v-if="publisher">
                        <div class="btn-group">
                            <van-button
                                    type="info"
                                    icon="edit"
                                    block
                                    :disabled="status !== 0"
                                    @click="editHandler"
                            >修改订单</van-button>
                            <van-button
                                    type="danger"
                                    icon="delete"
                                    block
                                    :disabled="status === 3 || status === 4"
                                    @click="cancelHandler"
                            >取消发布</van-button>
                        </div>
                    </template>

                    <!-- 开发者功能 -->
                    <template v-else-if="developer">
                        <div class="btn-group">
                            <van-button
                                    type="info"
                                    icon="completed"
                                    block
                            >完成</van-button>
                            <van-button
                                    icon="failure"
                                    block
                            >取消</van-button>
                        </div>
                    </template>

                    <!-- 其他用户查看 -->
                    <template v-else>
                        <van-button
                                type="info"
                                icon="gold-coin-o"
                                block
                                :disabled="status !== 0"
                                @click="tackHandler"
                        >接单</van-button>
                    </template>
                </template>
            </van-panel>
        </van-skeleton>
        <van-popup
                v-if="publisher"
                v-model="editPopupVisible"
                position="bottom"
                :lazy-render="false"
                close-on-popstate safe-area-inset-bottom
        >
            <EditorForm ref="editForm" confirm-text="修改" style="min-height: 100vh;" @submit="changeDataHandler">
                <template #button>
                    <van-button block type="info" native-type="submit">保存修改</van-button>
                    <van-button block native-type="button" @click="editPopupVisible = false">取消修改</van-button>
                </template>
            </EditorForm>
        </van-popup>
    </div>
</template>

<script>
    import { Skeleton, Panel, Divider, Image, Loading, Row, Col, Steps, Step, Button, Popup, Toast, Dialog, Icon } from "vant";
    import Ajax from "@/api";
    import moment from "moment";
    import EditorForm from "@/components/EditorForm";
    import Tools from "@/tools";
    import wx from "weixin-js-sdk";

    export default {
        name: "Detail",
        components: {
            [Skeleton.name]: Skeleton,
            [Panel.name]: Panel,
            [Divider.name]: Divider,
            [Image.name]: Image,
            [Loading.name]: Loading,
            [Row.name]: Row,
            [Col.name]: Col,
            [Steps.name]: Steps,
            [Step.name]: Step,
            [Button.name]: Button,
            [Popup.name]: Popup,
            [Icon.name]: Icon,
            EditorForm
        },
        data() {
            return {
                loaded: false,
                data: null,
                editPopupVisible: false,
            }
        },
        computed: {
            openid() {
                return this.$store.state.openid;
            },
            title() {
                let data = this.data;
                return data ? data.title || '' : '';
            },
            orderId() {
                return this.$route.params.orderId;
            },
            details() {
                let data = this.data;
                return data ? data.details || '' : '';
            },
            createTime() {
                let data = this.data;
                return data ? moment(data.createTime).format("YYYY-MM-DD HH-mm") : '';
            },
            status() {
                let data = this.data;
                return data ? data.status : 0;
            },
            deadline() {
                let data = this.data;
                return data ? moment(data.deadline).format("YYYY-MM-DD HH:mm") : '';
            },
            codeType() {
                let data = this.data;
                return data ? data.codeType : '';
            },
            budget() {
                let data = this.data;
                if (!data) {
                    return '';
                }
                let budget = data.budget;

                if (!budget) {
                    return '面谈';
                }

                return Tools.formatCurrency(budget);
            },
            pictures() {
                return ['https://img.yzcdn.cn/vant/cat.jpeg', 'https://img.yzcdn.cn/vant/cat.jpeg'];
                // let data = this.data;
                // if (!data) {
                //     return [];
                // }
                // let pictures = data.pictures;
                // if (!pictures) {
                //     return [];
                // }
                // return pictures.split(',').filter(url => url);
            },
            developer() {
                let data = this.data;
                return data ? data.developer === this.openid : false;
            },
            publisher() {
                let data = this.data;
                return data ? data.publisher === this.openid : false;
            },
            canOperate() {
                return this.status ===0 || this.developer || this.publisher
            },
        },
        methods: {
            // 接单
            tackHandler() {
                Dialog.confirm({
                    title: '温馨提示',
                    message: `是否开始《${this.title}》订单的工作？`,
                }).then(() => {
                    Ajax.tackOrder(this.orderId).then(({data}) => {
                        this.data = data.data;
                        Toast.success({
                            message: data.msg
                        });
                    });
                });
            },
            // 查看图片
            picturePreviewHandler(index) {
                wx.previewImage({
                    current: this.pictures[index],
                    urls: this.pictures
                });
            },
            // -------------- 以下为开发者相应的功能 --------------
            cancelTackHandler() {

            },
            // -------------- 以下为发布者相应的功能 --------------
            // 发布者编辑订单内容
            editHandler() {
                this.editPopupVisible = true;
                let data = this.data,
                    date = moment(data.deadline);
                this.$refs.editForm.setData({
                    title: data.title,
                    details: data.details,
                    codeType: data.codeType,
                    budget: data.budget,
                    time: date.format("HH:mm"),
                    date: date.toDate(),
                    pictures: data.pictures.split(',').filter(url => url),
                });
            },
            // 发布者修改订单内容
            changeDataHandler(data) {
                Ajax.updateOrder(this.orderId, {
                    title: data.title,
                    details: data.details,
                    budget: data.budget,
                    deadline: data.date + ' ' + data.time,
                    codeType: data.codeType
                }).then(({data: res}) => {
                    this.data = res.data;
                    Toast.success({message: res.msg});
                    this.editPopupVisible = false;
                });
            },
            // 取消发布订单
            cancelHandler() {
                Dialog.confirm({
                    title: '温馨提示',
                    message: `是否取消该订单？`,
                    cancelButtonColor: '#2A87EB',
                    cancelButtonText: "再想想",
                    confirmButtonColor: '#333333',
                    confirmButtonText: '取消发布',
                }).then(() => {
                    Ajax.cancelOrder(this.orderId).then(({data: res}) => {
                        this.data = res.data;
                        Toast.success({message: res.msg});
                    });
                });
            }
        },
        mounted() {
            Ajax.getOrderDetail(this.orderId).then((res) => {
                this.loaded = true;
                this.data = res.data.data;
            });
        }
    }
</script>

<style scoped lang="scss">
    .detail-page {
        /deep/ .van-panel > .van-panel__header >.van-cell__title {
            font-size: 20px;
        }
        .detail-content {
            padding: 20px;

            .detail-info {
                line-height: 26px;

                .label {
                    color: $sub_text;
                    font-size: 14px;
                }

                .text {
                    font-size: 16px;
                    color: $text;
                }

                .strong {
                    color: $error;
                    font-size: 18px;
                    font-weight: bold;
                }
            }

            .status-msg {
                color: $error;
                @include flex(flex-start);
            }
        }

        .btn-group {
            @include flex(space-between);
            .van-button + .van-button {
                margin-left: 10px;
            }
        }
    }
</style>