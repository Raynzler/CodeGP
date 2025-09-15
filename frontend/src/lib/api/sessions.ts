import { supabase } from '@/lib/supabase';

// Define the shape of our session data
export type SessionData = {
  wpm: number;
  accuracy: number;
  time: number;           // Time taken in seconds
  codeSnippet: string;    // The code they typed
  language: string;       // javascript, python, etc.
  driverRank: string;     // "Verstappen", "Hamilton", etc.
  sector1Time?: number;   // Optional sector times in milliseconds
  sector2Time?: number;
  sector3Time?: number;
};

export async function saveTypingSession(data: SessionData) {
  // Step 1: Get the current logged-in user
  const { data: { user } } = await supabase.auth.getUser();
  
  // If no user is logged in, don't save (but don't error)
  if (!user) {
    console.log('No user logged in, session not saved');
    return { success: false, reason: 'not_logged_in' };
  }

  // Step 2: Insert the session into the database
  const { data: session, error } = await supabase
    .from('typing_sessions')
    .insert({
      user_id: user.id,
      wpm: data.wpm,
      accuracy: data.accuracy,
      time: data.time,
      code_snippet: data.codeSnippet,
      language: data.language,
      driver_rank: data.driverRank,
      sector1_time: data.sector1Time,
      sector2_time: data.sector2Time,
      sector3_time: data.sector3Time,
    })
    .select()  // Return the created record
    .single(); // Get single object instead of array

  if (error) {
    console.error('Error saving session:', error);
    return { success: false, error };
  }

  // Step 3: Update user's profile stats
  await updateUserStats(user.id);

  return { success: true, session };
}

// Helper function to update user statistics
async function updateUserStats(userId: string) {
  try {
    // Get all sessions for this user
    const { data: sessions, error } = await supabase
      .from('typing_sessions')
      .select('wpm, time, accuracy')
      .eq('user_id', userId);

    if (error || !sessions || sessions.length === 0) return;

    // Calculate statistics
    const stats = {
      totalRaces: sessions.length,
      bestWpm: Math.max(...sessions.map(s => s.wpm)),
      averageWpm: Math.round(
        sessions.reduce((sum, s) => sum + s.wpm, 0) / sessions.length
      ),
      totalTime: sessions.reduce((sum, s) => sum + s.time, 0),
    };

    // Update the user's profile
    await supabase
      .from('profiles')
      .update({
        total_races: stats.totalRaces,
        best_wpm: stats.bestWpm,
        average_wpm: stats.averageWpm,
        total_time: stats.totalTime,
      })
      .eq('id', userId);

  } catch (error) {
    console.error('Error updating user stats:', error);
    // Don't throw - stats update is non-critical
  }
}

// Function to get user's best WPM for a specific language
export async function getUserBestWPM(language?: string) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  let query = supabase
    .from('typing_sessions')
    .select('wpm')
    .eq('user_id', user.id)
    .order('wpm', { ascending: false })
    .limit(1);

  // Add language filter if specified
  if (language) {
    query = query.eq('language', language);
  }

  const { data } = await query;
  return data?.[0]?.wpm || null;
}