<template>
    <div>
        <div class="container">
            <div class="row">
                <div id="single-article-sidebar" class="col-md-2 col-xs-12">
                    <div class="sidebar-container">
                        <ul class="text-right">
                            <li>
                                {{ post.comments_count }}
                                <svg class="svgIcon-use" width="29" height="29" viewBox="0 0 29 29"><path d="M21.27 20.058c1.89-1.826 2.754-4.17 2.754-6.674C24.024 8.21 19.67 4 14.1 4 8.53 4 4 8.21 4 13.384c0 5.175 4.53 9.385 10.1 9.385 1.007 0 2-.14 2.95-.41.285.25.592.49.918.7 1.306.87 2.716 1.31 4.19 1.31.276-.01.494-.14.6-.36a.625.625 0 0 0-.052-.65c-.61-.84-1.042-1.71-1.282-2.58a5.417 5.417 0 0 1-.154-.75zm-3.85 1.324l-.083-.28-.388.12a9.72 9.72 0 0 1-2.85.424c-4.96 0-8.99-3.706-8.99-8.262 0-4.556 4.03-8.263 8.99-8.263 4.95 0 8.77 3.71 8.77 8.27 0 2.25-.75 4.35-2.5 5.92l-.24.21v.32c0 .07 0 .19.02.37.03.29.1.6.19.92.19.7.49 1.4.89 2.08-.93-.14-1.83-.49-2.67-1.06-.34-.22-.88-.48-1.16-.74z"></path></svg>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="col-md-8 col-md-offset-2 col-xs-12 text-right">
                    <div class="mainheading">
                        <user-card v-if="post.user" :user="post.user" />
                        <h1 class="posttitle">{{ post.title }}</h1>
                        <span class="post-date">بروزرسانی شده در {{ post.updated_at | moment("jYY/jMM/jD") }}</span>
                        <span class="post-date"> | دسته‌بندی: </span>
                        <router-link class="post-category" v-if="post.category" :to="{ name: 'categories.index', params: { id: post.category.id, slug: post.category.title } }">
                            <span>{{ post.category.title }}</span>
                        </router-link>
                    </div>
                    <img v-if="post.cover_image" class="rounded featured-image img-fluid" :src="post.cover_image" :alt="post.cover_image">
                    <div v-if="post.brief_text" class="rounded bg-light p-3 mb-3">
                        <p class="m-0">{{ post.brief_text }}</p>
                    </div>
                    <div class="article-post" v-html="post.text"></div>
                    <div v-if="post.tags" class="mt-3">
                        <ul class="tags">
                            <li v-for="tag in post.tags">
                                <router-link :to="{ name: 'tags.index', params: { tag }}">{{ tag }}</router-link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <related :post_id="$route.params.id" v-if="! $root.isEmptyObject(post)"></related>
        <comments v-if="! $root.isEmptyObject(post)" :post="post"></comments>
    </div>
</template>

<script>
    import HttpRequest from '../../app/Classes/HttpRequest';

    export default {
        props: ['id', 'slug'],
        data() {
            return {
                post: {},
            }
        },
        components: {
            UserCard: require("../elements/user-card").default,
            Related: require("./Related").default,
            Comments: require("./Comments").default,
        },
        mounted() {
            if (window.httpCode == 200) {
                this.loadPost();
            } else {
                this.$router.push({ name: '404'});
            }
        },
        methods: {
            loadPost() {
                let id = this.$route.params.id;

                let request = new HttpRequest('/api/v1/posts/' + id);
                request.send(
                    (result) => {
                        this.post = result.data;
                        this.$root.setPageTitle(this.post.title);

                        setTimeout(function() {
                            window.renderScripts();
                            window.highlightSyntaxes();
                            if ($(window).width() > 768) {
                                $('.sidebar-container').stick_in_parent({
                                    parent: '#single-article-sidebar',
                                    offset_top: 100,
                                });
                            }
                        }, 50);
                        // this.loadRelatedPosts(id);
                    }
                    // (result) => {
                    //     if (result.status == 404) {
                    //         this.$router.push({ name: '404'});
                    //     }
                    // }
                );
            }
        },
        watch: {
            '$route.params.id': function() {
                // $("html, body").animate({ scrollTop: 0 }, "slow");
                $(window).scrollTop(0);
                this.loadPost();
            }
        }
    }
</script>
