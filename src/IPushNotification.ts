export interface PushNotification {
  title: string; // Título da notificação
  body?: string; // Corpo da notificação
  icon?: string; // Ícone a ser exibido com a notificação (para notificações web)
  image?: string; // Imagem a ser exibida com a notificação (para notificações web)
  badge?: string; // Ícone a ser exibido na notificação (para iOS)
  vibrate?: number[]; // Padrão de vibração do dispositivo (para Android)
  data?: any; // Dados adicionais a serem enviados com a notificação
  tag?: string; // Tag para agrupar notificações
  renotify?: boolean; // Indica se uma notificação com a mesma tag deve ser reexibida
  silent?: boolean; // Indica se a notificação deve ser silenciosa
  requireInteraction?: boolean; // Indica se a notificação requer interação do usuário
  actions?: NotificationAction[]; // Ações disponíveis para a notificação
  alert?: any;
}

interface NotificationAction {
  action: string; // Identificador único da ação
  title: string; // Título da ação
  icon?: string; // Ícone da ação
  url?: string; // URL a ser aberta ao clicar na ação
}
