<template>
  <div class="cms-layout">
    <Sidebar />

    <main class="main-content">
      <div class="content-header">
        <div class="header-info">
          <div class="header-left">
            <h1 class="page-title">Settings</h1>
            <p class="page-subtitle">
              Manage your application settings and preferences
            </p>
          </div>
          <button
            class="btn btn-primary"
            @click="saveAllSettings"
          >
            <i class="mdi mdi-content-save"></i>
            <span>Save All Changes</span>
          </button>
        </div>
      </div>

      <div class="content-body">
        <!-- Settings Navigation -->
        <div class="settings-navigation">
          <button
            class="nav-btn"
            :class="{ active: activeSection === 'general' }"
            @click="activeSection = 'general'"
          >
            <i class="mdi mdi-cog"></i>
            <span>General</span>
          </button>
          <button
            class="nav-btn"
            :class="{ active: activeSection === 'appearance' }"
            @click="activeSection = 'appearance'"
          >
            <i class="mdi mdi-palette"></i>
            <span>Appearance</span>
          </button>
          <button
            class="nav-btn"
            :class="{ active: activeSection === 'notifications' }"
            @click="activeSection = 'notifications'"
          >
            <i class="mdi mdi-bell"></i>
            <span>Notifications</span>
          </button>
          <button
            class="nav-btn"
            :class="{ active: activeSection === 'security' }"
            @click="activeSection = 'security'"
          >
            <i class="mdi mdi-shield"></i>
            <span>Security</span>
          </button>
          <button
            class="nav-btn"
            :class="{ active: activeSection === 'integrations' }"
            @click="activeSection = 'integrations'"
          >
            <i class="mdi mdi-connection"></i>
            <span>Integrations</span>
          </button>
          <button
            class="nav-btn"
            :class="{ active: activeSection === 'advanced' }"
            @click="activeSection = 'advanced'"
          >
            <i class="mdi mdi-tune"></i>
            <span>Advanced</span>
          </button>
        </div>

        <!-- Settings Content -->
        <div class="settings-content">
          <!-- General Settings -->
          <div
            v-if="activeSection === 'general'"
            class="settings-section"
          >
            <div class="section-header">
              <h2>General Settings</h2>
              <p>Configure basic application settings</p>
            </div>

            <div class="settings-form">
              <div class="form-group">
                <label class="form-label">Application Name</label>
                <input
                  v-model="settings.general.appName"
                  type="text"
                  class="form-input"
                  placeholder="Enter application name"
                />
              </div>

              <div class="form-group">
                <label class="form-label">Application URL</label>
                <input
                  v-model="settings.general.appUrl"
                  type="url"
                  class="form-input"
                  placeholder="https://your-app.com"
                />
              </div>

              <div class="form-group">
                <label class="form-label">Contact Email</label>
                <input
                  v-model="settings.general.contactEmail"
                  type="email"
                  class="form-input"
                  placeholder="contact@your-app.com"
                />
              </div>

              <div class="form-group">
                <label class="form-label">Timezone</label>
                <select
                  v-model="settings.general.timezone"
                  class="form-select"
                >
                  <option value="UTC">UTC</option>
                  <option value="America/New_York">Eastern Time</option>
                  <option value="America/Chicago">Central Time</option>
                  <option value="America/Denver">Mountain Time</option>
                  <option value="America/Los_Angeles">Pacific Time</option>
                  <option value="Europe/London">London</option>
                  <option value="Europe/Paris">Paris</option>
                  <option value="Asia/Tokyo">Tokyo</option>
                </select>
              </div>

              <div class="form-group">
                <label class="form-label">Language</label>
                <select
                  v-model="settings.general.language"
                  class="form-select"
                >
                  <option value="en">English</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                  <option value="de">German</option>
                  <option value="it">Italian</option>
                  <option value="pt">Portuguese</option>
                  <option value="ru">Russian</option>
                  <option value="ja">Japanese</option>
                  <option value="ko">Korean</option>
                  <option value="zh">Chinese</option>
                </select>
              </div>

              <div class="form-group">
                <label class="form-label">Date Format</label>
                <select
                  v-model="settings.general.dateFormat"
                  class="form-select"
                >
                  <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                  <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                  <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                  <option value="DD-MM-YYYY">DD-MM-YYYY</option>
                </select>
              </div>
            </div>
          </div>

          <!-- Appearance Settings -->
          <div
            v-if="activeSection === 'appearance'"
            class="settings-section"
          >
            <div class="section-header">
              <h2>Appearance Settings</h2>
              <p>Customize the look and feel of your application</p>
            </div>

            <div class="settings-form">
              <div class="form-group">
                <label class="form-label">Theme</label>
                <div class="theme-options">
                  <div
                    class="theme-option"
                    :class="{ active: settings.appearance.theme === 'light' }"
                    @click="settings.appearance.theme = 'light'"
                  >
                    <div class="theme-preview light-theme">
                      <div class="preview-header"></div>
                      <div class="preview-content"></div>
                    </div>
                    <span>Light</span>
                  </div>
                  <div
                    class="theme-option"
                    :class="{ active: settings.appearance.theme === 'dark' }"
                    @click="settings.appearance.theme = 'dark'"
                  >
                    <div class="theme-preview dark-theme">
                      <div class="preview-header"></div>
                      <div class="preview-content"></div>
                    </div>
                    <span>Dark</span>
                  </div>
                  <div
                    class="theme-option"
                    :class="{ active: settings.appearance.theme === 'auto' }"
                    @click="settings.appearance.theme = 'auto'"
                  >
                    <div class="theme-preview auto-theme">
                      <div class="preview-header"></div>
                      <div class="preview-content"></div>
                    </div>
                    <span>Auto</span>
                  </div>
                </div>
              </div>

              <div class="form-group">
                <label class="form-label">Primary Color</label>
                <div class="color-picker">
                  <input
                    v-model="settings.appearance.primaryColor"
                    type="color"
                    class="color-input"
                  />
                  <span class="color-value">{{
                    settings.appearance.primaryColor
                  }}</span>
                </div>
              </div>

              <div class="form-group">
                <label class="form-label">Sidebar Position</label>
                <div class="radio-group">
                  <label class="radio-option">
                    <input
                      v-model="settings.appearance.sidebarPosition"
                      type="radio"
                      value="left"
                    />
                    <span class="radio-label">Left</span>
                  </label>
                  <label class="radio-option">
                    <input
                      v-model="settings.appearance.sidebarPosition"
                      type="radio"
                      value="right"
                    />
                    <span class="radio-label">Right</span>
                  </label>
                </div>
              </div>

              <div class="form-group">
                <label class="form-label">Compact Mode</label>
                <div class="toggle-switch">
                  <input
                    v-model="settings.appearance.compactMode"
                    type="checkbox"
                    id="compactMode"
                  />
                  <label
                    for="compactMode"
                    class="toggle-label"
                  ></label>
                </div>
              </div>

              <div class="form-group">
                <label class="form-label">Show Animations</label>
                <div class="toggle-switch">
                  <input
                    v-model="settings.appearance.showAnimations"
                    type="checkbox"
                    id="showAnimations"
                  />
                  <label
                    for="showAnimations"
                    class="toggle-label"
                  ></label>
                </div>
              </div>
            </div>
          </div>

          <!-- Notifications Settings -->
          <div
            v-if="activeSection === 'notifications'"
            class="settings-section"
          >
            <div class="section-header">
              <h2>Notification Settings</h2>
              <p>Configure how you receive notifications</p>
            </div>

            <div class="settings-form">
              <div class="form-group">
                <label class="form-label">Email Notifications</label>
                <div class="notification-options">
                  <div class="notification-option">
                    <div class="option-info">
                      <span class="option-title">New Course Enrollments</span>
                      <span class="option-description"
                        >Get notified when students enroll in courses</span
                      >
                    </div>
                    <div class="toggle-switch">
                      <input
                        v-model="settings.notifications.email.newEnrollments"
                        type="checkbox"
                        id="emailEnrollments"
                      />
                      <label
                        for="emailEnrollments"
                        class="toggle-label"
                      ></label>
                    </div>
                  </div>

                  <div class="notification-option">
                    <div class="option-info">
                      <span class="option-title">Course Completions</span>
                      <span class="option-description"
                        >Get notified when students complete courses</span
                      >
                    </div>
                    <div class="toggle-switch">
                      <input
                        v-model="settings.notifications.email.courseCompletions"
                        type="checkbox"
                        id="emailCompletions"
                      />
                      <label
                        for="emailCompletions"
                        class="toggle-label"
                      ></label>
                    </div>
                  </div>

                  <div class="notification-option">
                    <div class="option-info">
                      <span class="option-title">Payment Confirmations</span>
                      <span class="option-description"
                        >Get notified of successful payments</span
                      >
                    </div>
                    <div class="toggle-switch">
                      <input
                        v-model="settings.notifications.email.payments"
                        type="checkbox"
                        id="emailPayments"
                      />
                      <label
                        for="emailPayments"
                        class="toggle-label"
                      ></label>
                    </div>
                  </div>

                  <div class="notification-option">
                    <div class="option-info">
                      <span class="option-title">System Updates</span>
                      <span class="option-description"
                        >Get notified about system maintenance and updates</span
                      >
                    </div>
                    <div class="toggle-switch">
                      <input
                        v-model="settings.notifications.email.systemUpdates"
                        type="checkbox"
                        id="emailUpdates"
                      />
                      <label
                        for="emailUpdates"
                        class="toggle-label"
                      ></label>
                    </div>
                  </div>
                </div>
              </div>

              <div class="form-group">
                <label class="form-label">In-App Notifications</label>
                <div class="notification-options">
                  <div class="notification-option">
                    <div class="option-info">
                      <span class="option-title">Show Notifications</span>
                      <span class="option-description"
                        >Display notifications in the application</span
                      >
                    </div>
                    <div class="toggle-switch">
                      <input
                        v-model="settings.notifications.inApp.enabled"
                        type="checkbox"
                        id="inAppEnabled"
                      />
                      <label
                        for="inAppEnabled"
                        class="toggle-label"
                      ></label>
                    </div>
                  </div>

                  <div class="notification-option">
                    <div class="option-info">
                      <span class="option-title">Sound Alerts</span>
                      <span class="option-description"
                        >Play sound when new notifications arrive</span
                      >
                    </div>
                    <div class="toggle-switch">
                      <input
                        v-model="settings.notifications.inApp.sound"
                        type="checkbox"
                        id="inAppSound"
                      />
                      <label
                        for="inAppSound"
                        class="toggle-label"
                      ></label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Security Settings -->
          <div
            v-if="activeSection === 'security'"
            class="settings-section"
          >
            <div class="section-header">
              <h2>Security Settings</h2>
              <p>Manage your account security and privacy</p>
            </div>

            <div class="settings-form">
              <div class="form-group">
                <label class="form-label">Two-Factor Authentication</label>
                <div class="security-option">
                  <div class="option-info">
                    <span class="option-title">Enable 2FA</span>
                    <span class="option-description"
                      >Add an extra layer of security to your account</span
                    >
                  </div>
                  <div class="toggle-switch">
                    <input
                      v-model="settings.security.twoFactorEnabled"
                      type="checkbox"
                      id="twoFactor"
                    />
                    <label
                      for="twoFactor"
                      class="toggle-label"
                    ></label>
                  </div>
                </div>
              </div>

              <div class="form-group">
                <label class="form-label">Session Timeout</label>
                <select
                  v-model="settings.security.sessionTimeout"
                  class="form-select"
                >
                  <option value="15">15 minutes</option>
                  <option value="30">30 minutes</option>
                  <option value="60">1 hour</option>
                  <option value="120">2 hours</option>
                  <option value="480">8 hours</option>
                  <option value="1440">24 hours</option>
                </select>
              </div>

              <div class="form-group">
                <label class="form-label">Password Requirements</label>
                <div class="password-requirements">
                  <div class="requirement">
                    <input
                      v-model="settings.security.passwordRequirements.minLength"
                      type="number"
                      class="form-input small"
                      min="8"
                      max="32"
                    />
                    <span>Minimum length</span>
                  </div>
                  <div class="requirement">
                    <div class="toggle-switch">
                      <input
                        v-model="
                          settings.security.passwordRequirements
                            .requireUppercase
                        "
                        type="checkbox"
                        id="requireUppercase"
                      />
                      <label
                        for="requireUppercase"
                        class="toggle-label"
                      ></label>
                    </div>
                    <span>Require uppercase letters</span>
                  </div>
                  <div class="requirement">
                    <div class="toggle-switch">
                      <input
                        v-model="
                          settings.security.passwordRequirements.requireNumbers
                        "
                        type="checkbox"
                        id="requireNumbers"
                      />
                      <label
                        for="requireNumbers"
                        class="toggle-label"
                      ></label>
                    </div>
                    <span>Require numbers</span>
                  </div>
                  <div class="requirement">
                    <div class="toggle-switch">
                      <input
                        v-model="
                          settings.security.passwordRequirements.requireSymbols
                        "
                        type="checkbox"
                        id="requireSymbols"
                      />
                      <label
                        for="requireSymbols"
                        class="toggle-label"
                      ></label>
                    </div>
                    <span>Require special characters</span>
                  </div>
                </div>
              </div>

              <div class="form-group">
                <label class="form-label">Login History</label>
                <div class="login-history">
                  <div
                    v-for="login in settings.security.loginHistory"
                    :key="login.id"
                    class="login-entry"
                  >
                    <div class="login-info">
                      <span class="login-time">{{
                        formatDate(login.timestamp)
                      }}</span>
                      <span class="login-location">{{ login.location }}</span>
                      <span class="login-device">{{ login.device }}</span>
                    </div>
                    <span
                      class="login-status"
                      :class="login.status"
                    >
                      {{ login.status }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Integrations Settings -->
          <div
            v-if="activeSection === 'integrations'"
            class="settings-section"
          >
            <div class="section-header">
              <h2>Integration Settings</h2>
              <p>Connect with third-party services and tools</p>
            </div>

            <div class="settings-form">
              <div class="form-group">
                <label class="form-label">Payment Gateway</label>
                <select
                  v-model="settings.integrations.paymentGateway"
                  class="form-select"
                >
                  <option value="stripe">Stripe</option>
                  <option value="paypal">PayPal</option>
                  <option value="razorpay">Razorpay</option>
                  <option value="mollie">Mollie</option>
                </select>
              </div>

              <div class="form-group">
                <label class="form-label">Email Service</label>
                <select
                  v-model="settings.integrations.emailService"
                  class="form-select"
                >
                  <option value="sendgrid">SendGrid</option>
                  <option value="mailgun">Mailgun</option>
                  <option value="aws-ses">AWS SES</option>
                  <option value="smtp">SMTP</option>
                </select>
              </div>

              <div class="form-group">
                <label class="form-label">Analytics</label>
                <div class="integration-options">
                  <div class="integration-option">
                    <div class="option-info">
                      <span class="option-title">Google Analytics</span>
                      <span class="option-description"
                        >Track website traffic and user behavior</span
                      >
                    </div>
                    <div class="toggle-switch">
                      <input
                        v-model="settings.integrations.googleAnalytics.enabled"
                        type="checkbox"
                        id="googleAnalytics"
                      />
                      <label
                        for="googleAnalytics"
                        class="toggle-label"
                      ></label>
                    </div>
                  </div>

                  <div
                    v-if="settings.integrations.googleAnalytics.enabled"
                    class="form-group"
                  >
                    <label class="form-label">Google Analytics ID</label>
                    <input
                      v-model="settings.integrations.googleAnalytics.trackingId"
                      type="text"
                      class="form-input"
                      placeholder="G-XXXXXXXXXX"
                    />
                  </div>

                  <div class="integration-option">
                    <div class="option-info">
                      <span class="option-title">Facebook Pixel</span>
                      <span class="option-description"
                        >Track conversions and optimize ads</span
                      >
                    </div>
                    <div class="toggle-switch">
                      <input
                        v-model="settings.integrations.facebookPixel.enabled"
                        type="checkbox"
                        id="facebookPixel"
                      />
                      <label
                        for="facebookPixel"
                        class="toggle-label"
                      ></label>
                    </div>
                  </div>

                  <div
                    v-if="settings.integrations.facebookPixel.enabled"
                    class="form-group"
                  >
                    <label class="form-label">Facebook Pixel ID</label>
                    <input
                      v-model="settings.integrations.facebookPixel.pixelId"
                      type="text"
                      class="form-input"
                      placeholder="XXXXXXXXXX"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Advanced Settings -->
          <div
            v-if="activeSection === 'advanced'"
            class="settings-section"
          >
            <div class="section-header">
              <h2>Advanced Settings</h2>
              <p>Advanced configuration options for power users</p>
            </div>

            <div class="settings-form">
              <div class="form-group">
                <label class="form-label">Debug Mode</label>
                <div class="toggle-switch">
                  <input
                    v-model="settings.advanced.debugMode"
                    type="checkbox"
                    id="debugMode"
                  />
                  <label
                    for="debugMode"
                    class="toggle-label"
                  ></label>
                </div>
                <span class="form-help"
                  >Enable detailed logging and error reporting</span
                >
              </div>

              <div class="form-group">
                <label class="form-label">Cache Duration</label>
                <select
                  v-model="settings.advanced.cacheDuration"
                  class="form-select"
                >
                  <option value="0">No caching</option>
                  <option value="300">5 minutes</option>
                  <option value="900">15 minutes</option>
                  <option value="1800">30 minutes</option>
                  <option value="3600">1 hour</option>
                  <option value="86400">24 hours</option>
                </select>
              </div>

              <div class="form-group">
                <label class="form-label">API Rate Limiting</label>
                <input
                  v-model="settings.advanced.apiRateLimit"
                  type="number"
                  class="form-input"
                  placeholder="1000"
                  min="100"
                  max="10000"
                />
                <span class="form-help">Requests per minute</span>
              </div>

              <div class="form-group">
                <label class="form-label">Backup Frequency</label>
                <select
                  v-model="settings.advanced.backupFrequency"
                  class="form-select"
                >
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="never">Never</option>
                </select>
              </div>

              <div class="form-group">
                <label class="form-label">Data Retention</label>
                <select
                  v-model="settings.advanced.dataRetention"
                  class="form-select"
                >
                  <option value="30">30 days</option>
                  <option value="90">90 days</option>
                  <option value="180">6 months</option>
                  <option value="365">1 year</option>
                  <option value="0">Forever</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import Sidebar from "@/components/layout/Sidebar.vue";

export default {
  name: "Settings",
  components: {
    Sidebar,
  },
  data() {
    return {
      activeSection: "general",
      isLoading: false,
      settings: {
        general: {
          appName: "LMS Platform",
          appUrl: "https://lms-platform.com",
          contactEmail: "contact@lms-platform.com",
          timezone: "UTC",
          language: "en",
          dateFormat: "MM/DD/YYYY",
        },
        appearance: {
          theme: "light",
          primaryColor: "#3b82f6",
          sidebarPosition: "left",
          compactMode: false,
          showAnimations: true,
        },
        notifications: {
          email: {
            newEnrollments: true,
            courseCompletions: true,
            payments: true,
            systemUpdates: false,
          },
          inApp: {
            enabled: true,
            sound: true,
          },
        },
        security: {
          twoFactorEnabled: false,
          sessionTimeout: 60,
          passwordRequirements: {
            minLength: 8,
            requireUppercase: true,
            requireNumbers: true,
            requireSymbols: false,
          },
          loginHistory: [
            {
              id: 1,
              timestamp: "2024-01-15T10:30:00Z",
              location: "New York, NY",
              device: "Chrome on Windows",
              status: "success",
            },
            {
              id: 2,
              timestamp: "2024-01-14T15:45:00Z",
              location: "San Francisco, CA",
              device: "Safari on iPhone",
              status: "success",
            },
            {
              id: 3,
              timestamp: "2024-01-13T08:20:00Z",
              location: "Unknown",
              device: "Unknown",
              status: "failed",
            },
          ],
        },
        integrations: {
          paymentGateway: "stripe",
          emailService: "sendgrid",
          googleAnalytics: {
            enabled: true,
            trackingId: "G-XXXXXXXXXX",
          },
          facebookPixel: {
            enabled: false,
            pixelId: "",
          },
        },
        advanced: {
          debugMode: false,
          cacheDuration: 900,
          apiRateLimit: 1000,
          backupFrequency: "daily",
          dataRetention: 365,
        },
      },
    };
  },
  methods: {
    saveAllSettings() {
      this.isLoading = true;

      // Simulate API call
      setTimeout(() => {
        console.log("Settings saved:", this.settings);
        this.isLoading = false;
        // Show success message
        alert("Settings saved successfully!");
      }, 1000);
    },
    formatDate(dateString) {
      return new Date(dateString).toLocaleString();
    },
  },
};
</script>

<style lang="scss" scoped>
@use "@/styles/cms.scss" as *;
@use "@/styles/pages/settings" as *;
</style>
