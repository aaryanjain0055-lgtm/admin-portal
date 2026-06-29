import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTheme } from "@/context/ThemeContext";
import { Building2, Globe, Lock, Bell, Palette, Database, Shield, Zap, Key } from "lucide-react";
import { cn } from "@/lib/utils";
import { delay } from "@/data/mock";

export function Settings() {
  const { theme, setTheme } = useTheme();
  const [activeTab, setActiveTab] = useState("general");
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const TABS = [
    { id: "general", label: "General", icon: Building2 },
    { id: "appearance", label: "Appearance", icon: Palette },
    { id: "security", label: "Security & SSO", icon: Shield },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "integrations", label: "Integrations", icon: Zap },
    { id: "api", label: "API Keys", icon: Key },
  ];

  const handleSave = async () => {
    setIsSaving(true);
    await delay(1000);
    setIsSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">Enterprise Settings</h2>
        <p className="text-slate-500">
          Manage your organization's configuration, security policies, and integrations.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8 items-start">
        <aside className="w-full md:w-64 shrink-0 flex flex-col gap-1">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors text-left",
                  activeTab === tab.id
                    ? "bg-indigo-50 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-400"
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100"
                )}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
              </button>
            );
          })}
        </aside>

        <div className="flex-1 w-full space-y-6">
          {activeTab === "general" && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <Card className="shadow-sm border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                <CardHeader>
                  <CardTitle>Organization Details</CardTitle>
                  <CardDescription>
                    Update your enterprise name, domain, and primary contact.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-2">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Organization Name</label>
                    <Input defaultValue="Acme Global Inc." className="max-w-md bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800" />
                  </div>
                  <div className="grid gap-2">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Enterprise Domain</label>
                    <Input defaultValue="acme-global.com" className="max-w-md bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800" />
                  </div>
                  <div className="grid gap-2">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Support Email</label>
                    <Input defaultValue="hr-support@acme-global.com" className="max-w-md bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800" />
                  </div>
                </CardContent>
                <CardFooter className="border-t border-slate-100 dark:border-slate-800 pt-5 bg-slate-50/50 dark:bg-slate-900/50 flex justify-between items-center rounded-b-xl">
                  <p className="text-sm text-slate-500">Please contact billing to change your enterprise plan.</p>
                  <Button onClick={handleSave} disabled={isSaving} className="bg-indigo-600 hover:bg-indigo-700 text-white min-w-[120px]">
                    {isSaving ? "Saving..." : saved ? "Saved!" : "Save Changes"}
                  </Button>
                </CardFooter>
              </Card>

              <Card className="shadow-sm border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                <CardHeader>
                  <CardTitle>Localization</CardTitle>
                  <CardDescription>
                    Set regional preferences for your global workforce.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                   <div className="grid gap-2">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Default Language</label>
                    <select className="flex h-10 w-full max-w-md rounded-md border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                      <option>English (United States)</option>
                      <option>English (United Kingdom)</option>
                      <option>Spanish (Spain)</option>
                      <option>French (France)</option>
                      <option>German (Germany)</option>
                      <option>Japanese</option>
                    </select>
                  </div>
                   <div className="grid gap-2">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Timezone</label>
                    <select className="flex h-10 w-full max-w-md rounded-md border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                      <option>Pacific Time (US & Canada)</option>
                      <option>Eastern Time (US & Canada)</option>
                      <option>Greenwich Mean Time (London)</option>
                      <option>Central European Time (Paris)</option>
                      <option>Japan Standard Time (Tokyo)</option>
                    </select>
                  </div>
                </CardContent>
                 <CardFooter className="border-t border-slate-100 dark:border-slate-800 pt-5 bg-slate-50/50 dark:bg-slate-900/50 justify-end rounded-b-xl">
                  <Button onClick={handleSave} disabled={isSaving} className="bg-indigo-600 hover:bg-indigo-700 text-white min-w-[120px]">
                    {isSaving ? "Saving..." : saved ? "Saved!" : "Save Changes"}
                  </Button>
                </CardFooter>
              </Card>
            </div>
          )}

          {activeTab === "appearance" && (
             <div className="space-y-6 animate-in fade-in duration-300">
              <Card className="shadow-sm border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                <CardHeader>
                  <CardTitle>Platform Theme</CardTitle>
                  <CardDescription>
                    Customize the look and feel of the platform for your session.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4 max-w-2xl">
                    <button
                      onClick={() => setTheme("light")}
                      className={cn(
                        "flex flex-col items-center gap-3 p-4 rounded-xl border-2 transition-all",
                        theme === "light" ? "border-indigo-600 bg-indigo-50/50 dark:bg-indigo-500/10" : "border-slate-200 dark:border-slate-800 hover:border-indigo-300"
                      )}
                    >
                      <div className="w-full h-24 rounded-md bg-white border border-slate-200 shadow-sm flex flex-col p-2 gap-2">
                        <div className="w-full h-4 bg-slate-100 rounded"></div>
                        <div className="flex gap-2 h-full">
                          <div className="w-1/3 h-full bg-slate-50 rounded"></div>
                          <div className="w-2/3 h-full bg-slate-100 rounded"></div>
                        </div>
                      </div>
                      <span className="font-semibold text-slate-900 dark:text-slate-100">Light</span>
                    </button>
                    <button
                      onClick={() => setTheme("dark")}
                      className={cn(
                        "flex flex-col items-center gap-3 p-4 rounded-xl border-2 transition-all",
                        theme === "dark" ? "border-indigo-600 bg-indigo-50/50 dark:bg-indigo-500/10" : "border-slate-200 dark:border-slate-800 hover:border-indigo-300"
                      )}
                    >
                      <div className="w-full h-24 rounded-md bg-slate-950 border border-slate-800 shadow-sm flex flex-col p-2 gap-2">
                        <div className="w-full h-4 bg-slate-800 rounded"></div>
                        <div className="flex gap-2 h-full">
                          <div className="w-1/3 h-full bg-slate-900 rounded"></div>
                          <div className="w-2/3 h-full bg-slate-800 rounded"></div>
                        </div>
                      </div>
                      <span className="font-semibold text-slate-900 dark:text-slate-100">Dark</span>
                    </button>
                    <button
                      onClick={() => setTheme("system")}
                      className={cn(
                        "flex flex-col items-center gap-3 p-4 rounded-xl border-2 transition-all",
                        theme === "system" ? "border-indigo-600 bg-indigo-50/50 dark:bg-indigo-500/10" : "border-slate-200 dark:border-slate-800 hover:border-indigo-300"
                      )}
                    >
                      <div className="w-full h-24 rounded-md bg-gradient-to-r from-slate-100 to-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col p-2 gap-2">
                         <div className="w-full h-4 bg-white/20 backdrop-blur rounded"></div>
                      </div>
                      <span className="font-semibold text-slate-900 dark:text-slate-100">System</span>
                    </button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "security" && (
             <div className="space-y-6 animate-in fade-in duration-300">
              <Card className="shadow-sm border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                <CardHeader>
                  <CardTitle>Single Sign-On (SSO)</CardTitle>
                  <CardDescription>
                    Configure SAML or OIDC for enterprise authentication.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                   <div className="flex items-center justify-between p-4 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950">
                    <div>
                      <h4 className="font-semibold text-slate-900 dark:text-slate-100">Microsoft Entra ID (Azure AD)</h4>
                      <p className="text-sm text-slate-500">Currently active identity provider.</p>
                    </div>
                    <div className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400 ring-1 ring-inset ring-emerald-600/20">Active</div>
                   </div>
                   <div className="flex items-center justify-between p-4 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950">
                    <div>
                      <h4 className="font-semibold text-slate-900 dark:text-slate-100">Okta</h4>
                      <p className="text-sm text-slate-500">Not configured.</p>
                    </div>
                    <Button variant="outline" size="sm">Configure</Button>
                   </div>
                </CardContent>
              </Card>

              <Card className="shadow-sm border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                <CardHeader>
                  <CardTitle>Session Policies</CardTitle>
                  <CardDescription>
                    Enforce security policies for active sessions.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                   <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-slate-900 dark:text-slate-100">Idle Timeout</h4>
                      <p className="text-sm text-slate-500">Log out users after period of inactivity.</p>
                    </div>
                    <select className="flex h-10 w-32 rounded-md border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-3 py-2 text-sm">
                      <option>15 minutes</option>
                      <option>30 minutes</option>
                      <option selected>1 hour</option>
                      <option>4 hours</option>
                    </select>
                   </div>
                   <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-slate-900 dark:text-slate-100">Require MFA</h4>
                      <p className="text-sm text-slate-500">Enforce Multi-Factor Auth for all admins.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-indigo-600"></div>
                    </label>
                   </div>
                </CardContent>
                <CardFooter className="border-t border-slate-100 dark:border-slate-800 pt-5 bg-slate-50/50 dark:bg-slate-900/50 justify-end rounded-b-xl">
                  <Button onClick={handleSave} disabled={isSaving} className="bg-indigo-600 hover:bg-indigo-700 text-white min-w-[120px]">
                    {isSaving ? "Saving..." : saved ? "Saved!" : "Save Changes"}
                  </Button>
                </CardFooter>
              </Card>
            </div>
          )}

           {activeTab === "notifications" && (
            <div className="space-y-6 animate-in fade-in duration-300">
               <Card className="shadow-sm border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                <CardHeader>
                  <CardTitle>Email Notifications</CardTitle>
                  <CardDescription>
                    Configure what updates your team receives.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                   <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-slate-900 dark:text-slate-100">New Applications</h4>
                      <p className="text-sm text-slate-500">Alert recruiters when new candidates apply.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                    </label>
                   </div>
                   <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-slate-900 dark:text-slate-100">AI Alerts</h4>
                      <p className="text-sm text-slate-500">Notify admins of high-risk hiring trends.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                    </label>
                   </div>
                </CardContent>
              </Card>
            </div>
           )}

           {(activeTab === "integrations" || activeTab === "api") && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <Card className="shadow-sm border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                <CardHeader>
                  <CardTitle>System Integrations</CardTitle>
                  <CardDescription>
                    Connect third-party tools to the recruitment pipeline.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-white p-2 shadow-sm border border-slate-100">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/d/d5/Slack_icon_2019.svg" alt="Slack" className="w-full h-full object-contain" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 dark:text-slate-100">Slack</h4>
                        <p className="text-sm text-slate-500">Send interview updates to #hiring channel.</p>
                      </div>
                    </div>
                    <Button variant="outline" className="text-indigo-600 border-indigo-200 bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-900/20 dark:border-indigo-800 dark:text-indigo-400">Connected</Button>
                  </div>
                  <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-white p-2 shadow-sm border border-slate-100">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/e/e9/Linkedin_icon.svg" alt="LinkedIn" className="w-full h-full object-contain" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 dark:text-slate-100">LinkedIn Talent Hub</h4>
                        <p className="text-sm text-slate-500">Sync candidate profiles automatically.</p>
                      </div>
                    </div>
                    <Button variant="outline">Connect</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
           )}
        </div>
      </div>
    </div>
  );
}
