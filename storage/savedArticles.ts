import AsyncStorage from '@react-native-async-storage/async-storage'

const STORAGE_KEY = '@saved_articles'

export const getSavedArticles = async (): Promise<any[]> => {
  const data = await AsyncStorage.getItem(STORAGE_KEY)
  return data ? JSON.parse(data) : []
}

export const saveArticle = async (article: any) => {
  const current = await getSavedArticles()
  const exists = current.some((a) => a.url === article.url)
  if (!exists) {
    const updated = [article, ...current]
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
  }
}

export const removeArticle = async (url: string) => {
  const current = await getSavedArticles()
  const updated = current.filter((a) => a.url !== url)
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
}

export const isArticleSaved = async (url: string): Promise<boolean> => {
  const current = await getSavedArticles()
  return current.some((a) => a.url === url)
}
