<template>
    <div class="editor-form-wrapper">
        <van-form @submit="submitHandler">
            <van-field
                    name="title"
                    v-model="title"
                    label="订单标题"
                    placeholder="请填写订单标题"
                    required
                    :rules="[
                        {required: true, message: '请填写订单标题'},
                        {validator: value => value.length <= 20, message: '不得超过20字'}
                    ]"
            />
            <van-field
                    name="budget"
                    label="预算金额"
                    v-model.number="budget"
                    placeholder="请填写预算金额（选填）"
                    type="number"
            />
            <van-field
                    name="details"
                    v-model="details"
                    label="详细内容"
                    type="textarea"
                    rows="3"
                    placeholder="请填写内容（不少于5字）"
                    required
                    autosize
                    :rules="[
                        {required: true, message: '请填写内容'},
                        {validator: value => value.length >= 5, message: '至少5字'}
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
                    name="date"
                    label="截止日期"
                    :value="formatDate"
                    placeholder="点击选择日期"
                    required
                    readonly
                    clickable
                    @click="calendarVisible = true"
            />
            <van-field
                    name="time"
                    label="截止时间"
                    :value="time"
                    placeholder="点击选择时间"
                    required
                    readonly
                    clickable
                    @click="timePopupVisible = true"
            />
            <van-field name="picture" label="附件图片">
                <template #input>
                    <van-uploader v-model="pictures"/>
                </template>
            </van-field>

            <div class="btn-group">
                <slot name="button">
                    <van-button round block type="info" native-type="submit">
                        发布
                    </van-button>
                </slot>
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
        <van-popup v-model="timePopupVisible" position="bottom">
            <van-datetime-picker
                    type="time"
                    :value="time"
                    @confirm="timeConfirmHandler"
                    @cancel="timePopupVisible = false"
            />
        </van-popup>
        <van-calendar v-model="calendarVisible" :default-date="date" @confirm="dateConfirmHandler" :min-date="minDate" title="截止日期选择"/>
    </div>
</template>

<script>
    import moment from 'moment';
    import { Field, Form, Button, Picker, Popup, DatetimePicker, Uploader, Calendar } from 'vant';

    export default {
        name: "EditorForm",
        components: {
            [Form.name]: Form,
            [Field.name]: Field,
            [Button.name]: Button,
            [Picker.name]: Picker,
            [Popup.name]: Popup,
            [DatetimePicker.name]: DatetimePicker,
            [Uploader.name]: Uploader,
            [Calendar.name]: Calendar,
        },
        data(){
            return {
                title: "",
                details: "",
                budget: null,
                codeType: 'Java',
                date: moment().add(7, 'days').toDate(),
                time: '23:59',
                pictures: [],
                codeTypePopupVisible: false,
                codeTypeOptions: ["Java", "JavaScript", "C", "C++", "C#", "Python", "Go", "PHP", "Node", '其他'],
                timePopupVisible: false,
                calendarVisible: false,
                minDate: moment().toDate(),
            }
        },
        computed: {
            formatDate() {
                return this.date ? moment(this.date).format("YYYY-MM-DD") : '';
            }
        },
        methods: {
            codeTypeConfirmHandler(value) {
                this.codeType = value;
                this.codeTypePopupVisible = false;
            },
            timeConfirmHandler(time) {
                this.time = time;
                this.timePopupVisible = false;
            },
            dateConfirmHandler(date) {
                this.date = date;
                this.calendarVisible = false;
            },
            submitHandler(e) {
                this.$emit('submit', e);
            },
            /**
             * @param {{
             *     title: string,
             *     details: string,
             *     codeType: string,
             *     budget: number,
             *     date: Date,
             *     time: string,
             *     pictures: Array<string>
             * }} data
             */
            setData(data) {
                for (let key in data) {
                    this[key] = data[key];
                }
            }
        },
    }
</script>

<style lang="scss">
    .editor-form-wrapper {
        .btn-group {
            margin: 16px;
            @include flex(space-between);
        }
    }
</style>