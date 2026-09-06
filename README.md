# WaLavar App

Aplicativo móvel para a lavanderia self-service **WaLavar Express** (Esteio/RS).
Permite ver o status das máquinas, agendar horários, entrar em fila de espera e
receber notificações de início e término do ciclo.

## Pré-requisitos

- Node.js 18+
- Expo Go instalado no celular (Android/iOS) **ou** emulador configurado

## Instalação

```bash
npm install
```

## Como rodar

```bash
npx expo start
```

Escaneie o QR Code com o aplicativo **Expo Go** no celular.

## Fluxo principal para demonstração

1. Abra o app → tela **Máquinas** (3 lavadoras, 3 secadoras)
2. Toque em uma máquina livre → veja os slots do dia
3. Toque em **Agendar** num slot disponível → confirme
4. Vá para a aba **Agendamentos** → toque em **Iniciar ciclo**
5. Receba a notificação de início imediatamente
6. Após ~40 segundos, receba a notificação de término

> A duração do ciclo é de 40 segundos para caber no vídeo.
> Em produção seria a duração real da lavagem (~45 min).
