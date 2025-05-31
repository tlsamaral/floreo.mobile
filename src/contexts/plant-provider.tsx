import { createContext, useContext, useState, ReactNode } from 'react'
import { PlantFormData } from '@/app/(app)/(tabs)/plants/new-plant'
import { supabase } from '@/lib/supabase'
import { useAuth } from './auth-context'

type PlantContextType = {
  plantData: PlantFormData | null
  floreoId: string | null
  setPlantData: (data: PlantFormData) => void
  setFloreoId: (id: string) => void
  savePlant: () => Promise<void>
  cancelPlant: () => void
}

const PlantContext = createContext({ } as PlantContextType)

export const usePlantContext = () => {
  const context = useContext(PlantContext)
  if (!context) throw new Error('usePlantContext deve ser usado dentro de PlantProvider')
  return context
}

type Props = {
  children: ReactNode
}

export const PlantProvider = ({ children }: Props) => {
  const [plantData, setPlantData] = useState<PlantFormData | null>(null)
  const [floreoId, setFloreoId] = useState<string | null>(null)

  const { user } = useAuth()

  async function savePlant() {
    if (!plantData || !floreoId) {
      console.warn('Dados incompletos para salvar')
      return
    }

    try {
      const { data, error } = await supabase.from('plants').insert({
        name: plantData.name,
        friendlyName: plantData.friendlyName,
        imageUri: plantData.imageUri,
        deviceId: floreoId,
        plantingDate: plantData.date,
        status: 'STARTING',
        minTemperatureCelsius: plantData.minTemperatureCelsius,
        maxTemperatureCelsius: plantData.maxTemperatureCelsius,
        idealLuminosityLx: plantData.idealLuminosityLx,
        irrigationsPerDay: plantData.irrigationsPerDay,
        mlPerIrrigation: plantData.mlPerIrrigation,
        species: '',
        user_id: user?.id
      } as any)

      if (error) {
        console.error('Erro ao salvar planta:', error)
        return
      }

      console.log(data)

      console.log('Planta salva com sucesso')
    } catch (error) {
      console.error('Erro ao salvar planta:', error)
    }
  }

  function cancelPlant() {
    setPlantData(null)
    setFloreoId(null)
    console.log('Cadastro de planta cancelado.')
  }

  return (
    <PlantContext.Provider
      value={{
        plantData,
        floreoId,
        setPlantData,
        setFloreoId,
        savePlant,
        cancelPlant,
      }}
    >
      {children}
    </PlantContext.Provider>
  )
}
