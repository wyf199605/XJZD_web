<template>
    <!-- 添加订单 -->
    <div class="editor-page">
        <EditorForm @submit="submitHandler"/>
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
                    deadline: data.deadline,
                    budget: data.budget,
                    pictures: '',
                    attachment: ''
                }).then(() => {
                    Toast.success("发布订单成功");
                });
            }
        }
    }
</script>

<style scoped lang="scss">
    .editor-page {
        @include coverScreen;
    }
</style>