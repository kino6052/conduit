import { uniqueId } from "lodash";
import { TIdMap } from "../../../utils/types";
import { TArticle } from "./types";
import { DEFAULT_TIME } from "../../utils/verification";

const DEFAULT_POST: TArticle = {
  id: "post-1",
  username: "jane-lobster",
  description: "A good article, a really really good one",
  hasLiked: false,
  likes: 24,
  tags: ["1", "2", "3"],
  title: "A good thing",
  date: new Date(DEFAULT_TIME).toDateString(),
  comments: [],
};

export class ArticleDatabase {
  private static articles: TIdMap<TArticle> = {
    [DEFAULT_POST.id]: DEFAULT_POST,
  };

  public static getArticleIds() {
    return Object.keys(this.articles);
  }

  public static getDoesArticleExist(id: string) {
    const ids = this.getArticleIds();

    return ids.includes(id);
  }

  public static getArticleById(id: string) {
    if (!this.getDoesArticleExist(id)) {
      throw new Error("Article does not exist");
    }

    return this.articles[id];
  }

  public static getArticles() {
    return Object.values(this.articles);
  }

  public static updateArticleById(
    id: string,
    partialArticle: Partial<TArticle>,
  ) {
    const article = this.getArticleById(id);

    if (!article) return;

    this.articles[id] = {
      ...this.articles[id],
      ...partialArticle,
    };

    return this.articles[id];
  }

  public static publishArticle(article: TArticle) {
    if (this.getDoesArticleExist(article.id)) {
      throw new Error("Article already exists");
    }

    this.articles[article.id] = article;
  }

  public static getArticlesByTag(tag: string) {
    return this.getArticles().filter(
      (article) => !!article.tags.find((_tag) => _tag === tag),
    );
  }

  public static getArticlesByUsername(username: string) {
    return this.getArticles().filter(
      (article) => article.username === username,
    );
  }

  public static getAllTags() {
    return this.getArticles()
      .map((article) => article.tags)
      .flat();
  }

  public static likeArticleById(id: string) {
    const article = this.getArticleById(id);

    const increment = [article.hasLiked && -1, 1].find(
      (item) => typeof item === "number",
    ) as number;

    this.updateArticleById(id, {
      hasLiked: !article.hasLiked,
      likes: article.likes + increment,
    });
  }

  public static addCommentById(id: string, comment: string, username: string) {
    const article = this.getArticleById(id);

    this.updateArticleById(id, {
      comments: [
        {
          id: uniqueId(),
          text: comment,
          username,
        },
        ...article.comments,
      ],
    });

    return this.getArticleById(id);
  }

  public static removeArticleById(id: string) {
    const doesExist = this.getDoesArticleExist(id);

    if (doesExist) {
      delete this.articles[id];
    }
  }
}
