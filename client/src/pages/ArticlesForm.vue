<script>
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import InputField from "../components/InputField.vue";
import {
  createArticle,
  getArticle,
  updateArticle,
  uploadThumbnail,
} from "../services/articles";
import { getCategories } from "../services/categories";

export default {
  components: { InputField },
  name: "ArticlesForm",
  data() {
    return {
      editor: ClassicEditor,
      editorConfig: {
        toolbar: [
          "undo",
          "redo",
          "|",
          "heading",
          "|",
          "bold",
          "italic",
          "link",
          "|",
          "bulletedList",
          "numberedList",
        ],
        placeholder: "Article Content",
      },
      article: {
        title: "",
        content: "",
        category: null,
        published: false,
        image: "/default/article.png",
      },
      isEdit: this.$route.params.id ? true : false,
      categories: [],
      image: null,
      errors: {},
      loading: false,
    };
  },
  async mounted() {
    if (this.isEdit) {
      this.article = await getArticle(this.$route.params.id);
      this.article.category =
        this.article.categories.length > 0
          ? this.article.categories[0].id
          : null;
    }
    this.categories = await getCategories();
  },
  methods: {
    async saveArticle() {
      this.errors = {};
      this.loading = true;

      try {
        const data = {
          title: this.article.title,
          content: this.article.content,
          categoryIds: [this.article.category],
          published: this.article.published,
        };

        let article = null;
        if (this.isEdit) {
          article = await updateArticle(this.article.id, data);
          this.$toast.success("Article updated successfully");
        } else {
          article = await createArticle(data);
          this.$toast.success("Article created successfully");
        }

        if (this.image && article) {
          this.uploadImage(article.id);
        }

        this.$router.push(`/read/${article.id}`);
      } catch (error) {
        for (const key in error.response.data.errors) {
          this.errors[key] = error.response.data.errors[key][0];
        }

        this.$toast.error("Something went wrong!");
      }

      this.loading = false;
    },
    async uploadImage(articleId) {
      let imageData = new FormData();
      imageData.append("image", this.image);

      try {
        await uploadThumbnail(articleId, imageData);
      } catch (error) {
        console.log(error);
      }
    },
    previewImage(event) {
      // Store file
      this.image = event.target.files[0];
      // Preview it
      let reader = new FileReader();
      let vm = this;

      reader.onload = (e) => {
        vm.article.image = e.target.result;
      };
      reader.readAsDataURL(this.image);
    },
  },
};
</script>

<template>
  <div class="profile py-20">
    <div class="container mx-auto px-4">
      <div class="lg:w-1/2 mx-auto">
        <h2 class="text-2xl font-brand text-secondary mb-8">
          {{ isEdit ? `Edit Article: ${article.title}` : "Add New Article" }}
        </h2>
        <div class="mb-8">
          <label for="avatar" class="cursor-pointer relative">
            <img
              :src="article.image"
              alt=""
              class="h-[400px] w-full object-cover border"
            />
            <div
              class="absolute bottom-2 left-2 px-4 py-2 bg-[#00000080] text-white text-xs"
            >
              Choose image
            </div>
          </label>
          <input id="avatar" type="file" hidden @change="previewImage" />
        </div>
        <InputField
          type="text"
          placeholder="Article Title"
          icon="user"
          v-model="article.title"
          :error="errors.title"
        />
        <div class="mb-4">
          <select
            v-model="article.category"
            class="px-4 py-2 bg-primary outline-none text-secondary w-full placeholder:text-secondary"
            :class="{ 'border border-red-500': errors.categoryIds }"
          >
            <option :value="null">Choose category</option>
            <option
              v-for="category in categories"
              :key="category.id"
              :value="category.id"
            >
              {{ category.name }}
            </option>
          </select>
          <div class="text-red-500 text-xs mt-1">{{ errors.categoryIds }}</div>
        </div>
        <div class="relative mb-4">
          <ckeditor
            :editor="editor"
            v-model="article.content"
            :config="editorConfig"
            class="h-[300px]"
          ></ckeditor>
          <!-- <textarea
            placeholder="Article Content"
            v-model="article.content"
            class="px-4 py-2 bg-primary outline-none text-secondary w-full placeholder:text-secondary h-[300px]"
            :class="{ 'border border-red-500': errors.content }"
          ></textarea>
          <div class="absolute bottom-2 right-2 text-xs text-gray-500">
            {{ article.content.length }} / 5000
          </div> -->
          <div class="text-red-500 text-xs mt-1">{{ errors.content }}</div>
        </div>
        <div class="mb-4">
          <input
            type="checkbox"
            id="published"
            v-model="article.published"
            class="mr-2"
          />
          <label for="published">Publish</label>
        </div>
        <button
          class="bg-secondary px-4 py-2 text-white disabled:opacity-50 disabled:cursor-not-allowed"
          @click="saveArticle"
          :disabled="loading"
        >
          <font-awesome-icon
            icon="spinner"
            v-if="loading"
            class="animate-spin"
          />
          <span v-else>{{ isEdit ? "Update Article" : "Save Article" }}</span>
        </button>
      </div>
    </div>
  </div>
</template>
