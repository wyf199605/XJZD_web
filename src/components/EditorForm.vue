<template>
    <div>
        <van-form @submit="submitHandler">
            <van-field
                    name="title"
                    v-model="title"
                    label="订单标题"
                    required
                    :rules="[{required: true, message: '请填写订单标题'}]"
            />
            <van-field
                    name="budget"
                    label="预算金额"
                    v-model.number="budget"
                    required
                    type="number"
                    :rules="[{required: true, message: '请填写预算金额'}]"
            />
            <van-field
                    name="details"
                    v-model="details"
                    label="详细内容"
                    type="textarea"
                    rows="3"
                    maxlength="200"
                    required
                    autosize
                    show-word-limit
                    :rules="[
                        {required: true, message: '请填写内容'},
                        {validator: value => value.length >= 10 && value.length <= 200, message: '至少10个，至多200个'}
                    ]"
            />
            <van-field
                    name="codeType"
                    :value="codeType"
                    label="代码类别"
                    placeholder="点击选择代码类别"
                    required
                    readonly
                    clickable
                    @click="codeTypePopupVisible = true"
            />
            <van-field
                    name="deadline"
                    label="截止日期"
                    :value="formatDate"
                    placeholder="点击选择日期"
                    required
                    readonly
                    clickable
                    @click="deadlinePopupVisible = true"
            />
            <van-field name="picture" label="附件图片">
                <template #input>
                    <van-uploader v-model="pictures" />
                </template>
            </van-field>

            <div style="margin: 16px;">
                <van-button round block type="info" native-type="submit">
                    发布
                </van-button>
            </div>
        </van-form>
        <!-- 代码类别下拉框 -->
        <van-popup v-model="codeTypePopupVisible" position="bottom">
            <van-picker
                    show-toolbar
                    :columns="codeTypeOptions"
                    @confirm="codeTypeConfirmHandler"
                    @cancel="codeTypePopupVisible = false"
            />
        </van-popup>
        <!-- 时间下拉框 -->
        <van-popup v-model="deadlinePopupVisible" position="bottom">
            <van-datetime-picker
                    type="datetime"
                    :value="deadline"
                    :min-date="minDate"
                    @confirm="deadlineConfirmHandler"
                    @cancel="deadlinePopupVisible = false"
            />
        </van-popup>
    </div>
</template>

<script>
    import Vue from 'vue';
    import moment from 'moment';
    import { Field, Form, Button, Picker, Popup, DatetimePicker, Uploader } from 'vant';

    Vue.use(Form);

    export default {
        name: "EditorForm",
        components: {
            [Field.name]: Field,
            [Button.name]: Button,
            [Picker.name]: Picker,
            [Popup.name]: Popup,
            [DatetimePicker.name]: DatetimePicker,
            [Uploader.name]: Uploader,
        },
        data(){
            return {
                title: "",
                details: "",
                budget: null,
                codeType: 'Java',
                codeTypePopupVisible: false,
                codeTypeOptions: ["Java", "JavaScript", "C", "C++", "C#", "Python", "Go", "PHP"],
                deadline: moment().add(7, 'days').toDate(),
                deadlinePopupVisible: false,
                minDate: moment().toDate(),
                pictures: []
            }
        },
        computed: {
            formatDate() {
                return this.deadline ? moment(this.deadline).format("YYYY-MM-DD HH:mm") : '';
            }
        },
        methods: {
            codeTypeConfirmHandler(value) {
                this.codeType = value;
                this.codeTypePopupVisible = false;
            },
            deadlineConfirmHandler(time) {
                this.deadline = time;
                this.deadlinePopupVisible = false
            },
            submitHandler(e) {
                this.$emit('submit', e);
            }
        }
    }
</script>

<style scoped>

</style>