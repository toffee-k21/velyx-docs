'use client'
import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Introduction } from './components/pages/Introduction';
import { Authentication } from './components/pages/Authentication';
import { GenerateAPIKey } from './components/pages/GenerateAPIKey';
import { BuildChat } from './components/pages/BuildChat';
import { WebSocketConnections } from './components/pages/WebSocketConnections';
import { TopicsSubscriptions } from './components/pages/TopicsSubscriptions';
import { PublishingEvents } from './components/pages/PublishingEvents';
import { WebSocketAPI } from './components/pages/WebSocketAPI';
import { HTTPPublishAPI } from './components/pages/HTTPPublishAPI';
import { SDKs } from './components/pages/SDKs';
import { Support } from './components/pages/Support';
import { ReconnectionGuide } from './components/pages/Reconnection';
import Footer from './components/pages/Footer';
import { Navigation } from './components/Navigation';

export default function App() {
  const [activePage, setActivePage] = useState('introduction');

  const handlePageChange = (page: string) => {
    setActivePage(page);
  };


  const renderPage = () => {
    switch (activePage) {
      case 'introduction':
        return <Introduction />;
      case 'authentication':
        return <Authentication />;
      case 'generate-api-key':
        return <GenerateAPIKey />;
      case 'build-chat':
        return <BuildChat />;
      case 'websocket-connections':
        return <WebSocketConnections />;
      case 'reconnection-guide' :
        return <ReconnectionGuide />
      case 'topics-subscriptions':
        return <TopicsSubscriptions />;
      case 'publishing-events':
        return <PublishingEvents />;
      case 'websocket-api':
        return <WebSocketAPI />;
      case 'http-publish-api':
        return <HTTPPublishAPI />;
      case 'sdks':
        return <SDKs />;
      case 'support':
        return <Support />;
      default:
        return <Introduction />;
    }
  };

  return (
    <div className="flex min-h-screen bg-black text-white">
      <Sidebar 
        activePage={activePage} 
        onPageChange={handlePageChange}
      />
      <main className="flex-1 ml-64">
          <Navigation />
        <div className="max-w-4xl mx-auto px-12 py-16">
          {renderPage()}
          <Footer />
        </div>
      </main>
    </div>
  );
}
