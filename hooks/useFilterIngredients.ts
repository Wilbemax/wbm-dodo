import { Api } from '@/services/api-routs'
import { Ingredient } from '@prisma/client'
import { useEffect, useState } from 'react'
import { useSet } from 'react-use'

interface ReturnProps {
  ingredients: Ingredient[]
  loading: boolean
  selectedIngredients: Set<string>
  onAddId: (id: string) => void
}

export const useFilterIngredients = (): ReturnProps => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  const [selectedIds, { toggle }] = useSet<string>(new Set([]))

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        setLoading(true)
        const arr = await Api.ingredients.getAllIngredients()
        setIngredients(arr)
        setLoading(false)
      } catch (e) {
        setLoading(true)
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    fetchIngredients()
  }, [setIngredients])

  return { ingredients, loading, onAddId: toggle, selectedIngredients: selectedIds }
}
