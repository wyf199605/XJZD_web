<template>
    <!-- 添加订单 -->
    <div class="editor-page">
        <EditorForm ref="editorForm" @submit="submitHandler"/>
    </div>
</template>

<script>
    import EditorForm from "@/components/EditorForm";
    import { Toast } from 'vant';
    import Ajax from "@/api";

    export default {
        name: "Editor",
        components: {
            EditorForm
        },
        methods: {
            submitHandler(data) {
                console.log(data);
                Ajax.insertOrder({
                    title: data.title,
                    details: data.details,
                    codeType: data.codeType,
                    deadline: data.date + ' ' + data.time,
                    budget: data.budget,
                    pictures: '',
                    attachment: ''
                }).then(() => {
                    Toast.success("发布订单成功");
                    this.$refs.editorForm.setData({
                        title: '',
                        details: '',
                        budget: null,
                        codeType: "Java"
                    })
                });
            }
        }
    }
</script>

<style scoped lang="scss">
    .editor-page {
        padding-bottom: 50px;
    }
</style>