import { Box, Grid2 as Grid, Typography } from '@mui/material'
import Container from '../../components/container'
import { ChangeEvent, useRef, useState } from 'react';
import { StyledMenuItem, StyledSelect } from './styles';
import { FLOWER_TYPE } from '../../consts';
import Input from '../../components/input';
import { useFlower } from '../../store';
import Button from '../../components/button';
import { useShallow } from 'zustand/shallow';

const INITIAL_STATE = {
  description: '',
  flowers: [],
  inStock: 0,
  name: '',
  price: 0,
}

const Dashboard = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [addToCatalog, flowers] = useFlower(useShallow((state) => [state.addToCatalog, state.flowers]))
  const [state, setState] = useState(INITIAL_STATE)

  const handleImageUploadClick = () => {
    fileInputRef.current?.click();
  };

  const updateImage = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setImageFile(file);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleFileDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
      const file = event.dataTransfer.files[0];
      setImageFile(file);
    }
  };

  const imageUpload = (src: string) => {
    
    const reader = new FileReader();
    if (!imageFile) return 
    reader.onloadend = () => {
      if (typeof reader.result !== 'string') return
 
      const base64StringUS = reader?.result?.replace("data:", "").replace(/^.+,/, "");
      localStorage.setItem(src, base64StringUS);
    };
    reader.readAsDataURL(imageFile);
  };

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
    setState((prev) => ({ ...prev, [e.target.name]: e.target.value }))

  const onUpload = () => {
    const id = Math.max(...(Object.values(flowers).map((fl) => fl.id))) + 1
    const src = `uploaded/${id}`
    imageUpload(src)

    addToCatalog({
      ...state,
      isNew: true,
      id,
      src
    })

    setImageFile(null)
    setState(INITIAL_STATE)
  }
  console.log(state)
  return (
    <Container>
      <Box display="flex" flexDirection="column" gap={2} width="100%">
        <Typography variant='h3' color='var(--green-dark)'>Добавить букет в каталог</Typography>
        <Grid container spacing={4}>
          <Grid
            size={3}
            height={460}
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
          >
            <Box
              border={'1px solid var(--green-dark)'}
              width={"100%"}
              height={460}
            >
              <Box
                onDragOver={handleDragOver}
                onDrop={handleFileDrop}
                onClick={handleImageUploadClick}
                height="100%"
                width="100%"
              >
                {imageFile ? (
                  <img
                    src={URL.createObjectURL(imageFile)}
                    alt="Uploaded"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                ) : (
                  <Box
                    height="100%"
                    width="100%"
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                    gap={2}
                  >
                    <img src='/public/flower-bouquet.svg' />
                    <Typography color='var(--green-dark)' variant='h4' textAlign="center">Загрузите<br /> фотографию</Typography>
                  </Box>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  style={{ display: "none" }}
                  onChange={updateImage}
                />
              </Box>
            </Box>
          </Grid>
          <Grid
            size={9}
            height={460}
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
          >
            <InputField onChange={onChange} label='Название' name='name' value={state.name} />
            <Box
              display="flex"
              flexDirection="column"
              alignItems="flex-start"
            >

              <Typography color="var(--green-dark)" variant='h4' textAlign="center">Цветы</Typography>
              <StyledSelect
                multiple
                value={state.flowers}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                onChange={(e) => setState((prev) => ({ ...prev, flowers: e.target.value as any }))}
                fullWidth
              >
                {Object.values(FLOWER_TYPE).map((fl) =>
                  <StyledMenuItem
                    key={fl.en}
                    value={fl.en}
                  >
                    {fl.ru}
                  </StyledMenuItem>
                )}
              </StyledSelect>
            </Box>
            <InputField onChange={onChange} label='Описание' name='description' value={state.description} />
            <Box display="flex" justifyContent="space-between" gap={3}>
              <InputField onChange={onChange} label='Стоимость, руб.' name='price' value={state.price} />
              <InputField onChange={onChange} label='В наличии, шт.' name='inStock' value={state.inStock} />
            </Box>
          </Grid>
        </Grid>
        <Box>

          <Button
            btnType='BROWN'
            size='large'
            onClick={onUpload}
            //disabled={!imageFile || !Object.values(state).some(val => !val) || state.flowers.length === 0}
          >
            Загрузить букет в каталог
          </Button>
        </Box>
      </Box>
    </Container>
  )
}

export default Dashboard


const InputField = ({ label, onChange, name }: {
  label: string
  name: string
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void
  value: string | number
}) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="flex-start"
      width="100%"
    >
      <Typography color="var(--green-dark)" variant='h4' textAlign="center">{label}</Typography>
      <Input fullWidth name={name} onChange={onChange} />
    </Box>
  )
}