import EmptinessOverlay from '@/components/EmptinessOverlay';
import Content from '@/components/content/Content';
import UploadModal from '@/components/modals/UploadModal';
import UINotification from '@/components/ui/UINotification';
import useInitImages from '@/hooks/useInitImages';
import EditingModal from '@/components/modals/EditingModal';

function App() {
  useInitImages();

  return (
    <>
      <Content />

      <EmptinessOverlay />
      <UINotification />
      <UploadModal />
      <EditingModal />
    </>
  )
}

export default App
