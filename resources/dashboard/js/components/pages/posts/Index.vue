<template>
    <div>
        <router-link class="btn btn-success" :to="{name: 'dashboard.posts.create'}">پست جدید</router-link>

        <b-table id="posts" :items="posts.items.data" class="mt-5 bg-white" :fields="table_fields">
            <template slot="title" slot-scope="data">
                <span v-on:click="handleFeatured(data.index)">
                    <i class="fa fa-star text-warning" v-if="data.item.featured"></i>
                    {{ data.item.title }}
                </span>
            </template>
            <template slot="edit" slot-scope="data">
                <router-link class="btn btn-primary" :to="{ name: 'dashboard.posts.edit', params: { post_id: data.item.hash_id } }"><i class="fa fa-edit"></i></router-link>
            </template>
            <template slot="delete" slot-scope="data">
                <button class="btn btn-danger" v-on:click="deletePost(data.index)">×</button>
            </template>
            <template slot="status" slot-scope="data">
                <span :class="'badge badge-' + post_statuses[data.item.status].color">{{ post_statuses[data.item.status].title }}</span>
            </template>
            <template slot="category" slot-scope="data">
                {{ data.item.category.title }}
            </template>
            <template slot="user" slot-scope="data">
                {{ data.item.user.name }}
            </template>
        </b-table>

        <pagination :data="posts.items" @pagination-change-page="loadPosts"></pagination>

    </div>
</template>

<script>

import pagination from 'laravel-vue-pagination';

export default {
    components: {
        pagination
    },
    beforeCreate() {
        if (! this.$root.isAuthenticated()) {
            this.$root.redirectToLogin();
        }
    },
    data() {
        return {
            functionsInitialized: false,
            posts: {
                items: [],
            },
            table_fields: [
                {key: 'id', label: 'شناسه'},
                {key: 'title', label: 'عنوان'},
                {key: 'user', label: 'کاربر'},
                {key: 'category', label: 'دسته بندی'},
                {key: 'status', label: 'وضعیت'},
                {key: 'created_at', label: 'ایجاد شده'},
                {key: 'edit', label: 'ویرایش'},
                {key: 'delete', label: 'حذف'}
            ],
            categories: [],
            post_statuses: {
                1: {title: 'عدم انتشار', color: 'light'},
                2: {title: 'پیش نویس', color: 'warning'},
                3: {title: 'منتشر شده', color: 'success'}
            },
        }
    },
    mounted() {
        if (! this.$root.isAuthenticated()) {
            return this.$root.redirectToLogin();
        }

        this.initializeFunctions();
        this.$root.setPageTitle('پست ها');
        this.loadPosts();
        this.loadCategories();
    },
    methods: {
        initializeFunctions() {
            if (! this.functionsInitialized) {

            }
        },
        loadCategories: function() {
            $.get(this.$root.api_url + '/categories', (response) => {
                if (response.status == 1) {
                    this.categories = response.data;
                }
            });
        },
        loadPosts: function(page = 1) {
            $.get(this.$root.api_url + '/posts?page=' + page, (response) => {
                if (response.status == 1) {
                    this.posts.items = response.data;
                }
            });
        },
        deletePost(index) {
            if (confirm('Really?')) {
                let post = this.posts.items.data[index];
                $.post(this.$root.api_url + '/posts/' + post.hash_id, { _method: 'delete' }, (response) => {
                    if (response.status == 1) {
                        this.$root.$delete(this.posts.items, index);
                        window.success_notification(response.message);
                    }
                });
            }
        },
        handleFeatured(index) {
            let post = this.posts.items.data[index];
            let path = post.featured ? 'remove-from-featured' : 'add-to-featured';

            $.post(this.$root.api_url + '/posts/' + post.hash_id + '/' + path, (response) => {
                if (response.status) {
                    this.$root.$set(post, 'featured', ! post.featured);
                }
            });
        }
    }
}
</script>


